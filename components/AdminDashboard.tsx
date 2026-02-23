// src/components/AdminDashboard.tsx
import React, { useState, useEffect, useRef } from "react";
import { Project, ContactMessage } from "../types";
import {
  getProjects,
  saveProject,
  deleteProject,
  getMessages,
  deleteMessage,
  uploadProjectImage,
} from "../services/storage";

export const AdminDashboard: React.FC = () => {
  /* ---------------- AUTH ---------------- */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  /* ---------------- NAV ---------------- */
  const [activeTab, setActiveTab] = useState<"projects" | "messages">(
    "projects",
  );

  /* ---------------- DATA ---------------- */
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  /* ---------------- FORM ---------------- */
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------- IMAGE UPLOAD ---------------- */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  /* ---------------- UI STATE ---------------- */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      setLoading(true);
      const [p, m] = await Promise.all([getProjects(), getMessages()]);
      setProjects(p);
      setMessages(m);
      setLoading(false);
    })();
  }, [isAuthenticated]);

  /* ---------------- FLASH HELPERS ---------------- */
  const flash = (type: "success" | "error", msg: string) => {
    if (type === "success") setSuccess(msg);
    else setError(msg);
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3500);
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") setIsAuthenticated(true);
    else flash("error", "Wrong password");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPassword("");
    window.location.hash = "";
  };

  /* ---------------- IMAGE PICK ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------- ADD PROJECT ---------------- */
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      flash("error", "Fill all required fields");
      return;
    }
    if (!imageFile) {
      flash("error", "Please select an image");
      return;
    }

    setUploading(true);
    const imageUrl = await uploadProjectImage(imageFile);
    setUploading(false);

    if (!imageUrl) {
      flash(
        "error",
        "Image upload failed — check your Supabase bucket settings",
      );
      return;
    }

    const saved = await saveProject({ title, category, description, imageUrl });
    if (!saved) {
      flash("error", "Failed to save project");
      return;
    }

    setProjects((prev) => [saved, ...prev]);
    setTitle("");
    setCategory("");
    setDescription("");
    clearImage();
    flash("success", "Project added successfully");
  };

  /* ---------------- REMOVE PROJECT ---------------- */
  const removeProject = async (id: string) => {
    if (!window.confirm("Delete this project?")) return;
    const ok = await deleteProject(id);
    if (ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      flash("success", "Project deleted");
    } else {
      flash("error", "Failed to delete project");
    }
  };

  /* ---------------- REMOVE MESSAGE ---------------- */
  const removeMessage = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;
    const ok = await deleteMessage(id);
    if (ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      flash("success", "Message deleted");
    } else {
      flash("error", "Failed to delete message");
    }
  };

  /* ---------------- SHARED INPUT CLASSES ---------------- */
  const inputCls =
    "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

  /* ---------------- TOAST ---------------- */
  const Toast = () => (
    <>
      {success && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-fade-in-up flex items-center gap-2">
          <span>✓</span> {success}
        </div>
      )}
      {error && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white text-sm px-5 py-3 rounded-xl shadow-lg animate-fade-in-up flex items-center gap-2">
          <span>✕</span> {error}
        </div>
      )}
    </>
  );

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <Toast />
        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 w-full max-w-sm space-y-5 shadow-2xl"
        >
          <div className="text-center space-y-1">
            <div className="text-3xl">🔐</div>
            <h2 className="text-xl font-semibold text-zinc-100">Admin Login</h2>
            <p className="text-sm text-zinc-500">
              Enter your password to continue
            </p>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputCls}
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  /* ---------------- DASHBOARD ---------------- */
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Toast />

      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
          {(["projects", "messages"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {tab === "messages"
                ? `Messages (${messages.length})`
                : "Projects"}
            </button>
          ))}
        </div>
        <button
          onClick={logout}
          className="text-sm text-zinc-400 hover:text-red-400 transition font-medium"
        >
          Logout →
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* ══ PROJECTS TAB ══ */}
        {activeTab === "projects" && (
          <>
            {/* Add Project Form */}
            <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-lg">
              <h3 className="text-lg font-semibold text-zinc-100">
                Add New Project
              </h3>
              <form onSubmit={addProject} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    placeholder="Project title *"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputCls}
                  />
                  <input
                    placeholder="Category * (e.g. URBAN PLANNING)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <textarea
                  placeholder="Project description *"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={inputCls}
                />

                {/* ── Image Upload ── */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                    imagePreview
                      ? "border-indigo-500 bg-indigo-500/5"
                      : "border-zinc-700 hover:border-zinc-500 bg-zinc-800/50"
                  }`}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearImage();
                        }}
                        className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-500 text-white text-xs px-2 py-1 rounded-lg transition"
                      >
                        Remove
                      </button>
                      <p className="text-xs text-zinc-500 mt-3">
                        {imageFile?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl">🖼️</div>
                      <p className="text-zinc-400 text-sm font-medium">
                        Click to upload project image
                      </p>
                      <p className="text-zinc-600 text-xs">
                        PNG, JPG, WEBP — stored in Supabase Storage
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Save Project"
                  )}
                </button>
              </form>
            </section>

            {/* Project Grid */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                Portfolio ({projects.length})
              </h3>
              {loading && (
                <p className="text-zinc-500 text-sm">Loading projects...</p>
              )}
              {!loading && projects.length === 0 && (
                <p className="text-zinc-500 text-sm">No projects added yet.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative h-96 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90" />
                    <button
                      onClick={() => removeProject(project.id)}
                      className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition bg-red-600/80 hover:bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-indigo-400 font-mono text-xs tracking-widest mb-2 block uppercase">
                        {project.category}
                      </span>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h4>
                      <p className="text-zinc-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {project.description}
                      </p>
                      <div className="w-full h-[1px] bg-indigo-500 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ══ MESSAGES TAB ══ */}
        {activeTab === "messages" && (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Inbox ({messages.length})
            </h3>
            {loading && (
              <p className="text-zinc-500 text-sm">Loading messages...</p>
            )}
            {!loading && messages.length === 0 && (
              <p className="text-zinc-500 text-sm">No messages yet.</p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-600 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-zinc-100">{msg.name}</h4>
                    <span className="text-xs text-indigo-400">{msg.email}</span>
                  </div>
                  <button
                    onClick={() => removeMessage(msg.id)}
                    className="text-xs bg-red-600/80 hover:bg-red-500 text-white px-2 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-sm text-zinc-400">{msg.message}</p>
                {msg.date && (
                  <p className="text-xs text-zinc-600">
                    {new Date(msg.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

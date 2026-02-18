import React, { useState, useEffect } from "react";
import { Project, ContactMessage } from "../types";
import {
  getProjects,
  saveProject,
  deleteProject,
  getMessages,
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
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getProjects() || []);
      setMessages(getMessages() || []);
    }
  }, [isAuthenticated]);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") setIsAuthenticated(true);
    else alert("Wrong password");
  };

  const logout = () => {
    setIsAuthenticated(false);
    window.location.hash = "";
  };

  /* ---------------- PROJECT ACTIONS ---------------- */
  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Fill all required fields");
      return;
    }
    const project: Project = {
      id: Date.now().toString(),
      title,
      category,
      description,
      imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400`,
    };
    setProjects(saveProject(project));
    setTitle("");
    setCategory("");
    setDescription("");
    setImageUrl("");
  };

  const removeProject = (id: string) => {
    if (window.confirm("Delete this project?")) {
      setProjects(deleteProject(id));
    }
  };

  /* ---------------- SHARED INPUT CLASSES ---------------- */
  const inputCls =
    "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
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
                <input
                  placeholder="Image URL (optional — auto-generated if blank)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={inputCls}
                />
                <textarea
                  placeholder="Project description *"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={inputCls}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
                >
                  Save Project
                </button>
              </form>
            </section>

            {/* Project Grid — mirrors About.tsx card layout */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-4">
                Portfolio ({projects.length})
              </h3>
              {projects.length === 0 && (
                <p className="text-zinc-500 text-sm">No projects added yet.</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative h-96 overflow-hidden cursor-pointer"
                  >
                    {/* Card image */}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90" />

                    {/* Delete button — top right */}
                    <button
                      onClick={() => removeProject(project.id)}
                      className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition bg-red-600/80 hover:bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Delete
                    </button>

                    {/* Text content */}
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
            {messages.length === 0 && (
              <p className="text-zinc-500 text-sm">No messages yet.</p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2 hover:border-zinc-600 transition"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-zinc-100">{msg.name}</h4>
                  <span className="text-xs text-indigo-400">{msg.email}</span>
                </div>
                <p className="text-sm text-zinc-400">{msg.message}</p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

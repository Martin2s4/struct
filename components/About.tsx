// src/components/About.tsx
import React, { useState, useEffect } from "react";
import { Project } from "../types";
import { getProjects } from "../services/storage";

export const About: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="bg-structure-gray py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Bio Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-neon-blue font-sans tracking-[0.2em] mb-2 text-sm uppercase">
              About the Architect
            </h2>
            <h3 className="text-4xl font-display font-bold text-white mb-6">
              Designing for <br /> Resilience
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              With over 3 years of experience in high-density urban planning and
              structural dynamics, I specialize in creating infrastructure that
              adapts to its environment. My work focuses on the intersection of
              classic civil engineering principles and emerging
              nanotechnologies.
            </p>
            <div className="grid grid-cols-2 gap-4 text-white font-mono text-sm">
              <div className="border-l-2 border-neon-blue pl-4">
                <span className="block text-gray-500 text-xs mb-1 tracking-widest uppercase">
                  Specialty
                </span>
                Structural Dynamics
              </div>
              <div className="border-l-2 border-neon-purple pl-4">
                <span className="block text-gray-500 text-xs mb-1 tracking-widest uppercase">
                  Education
                </span>
                BSC. Civil Eng.
              </div>
              <div className="border-l-2 border-neon-blue pl-4">
                <span className="block text-gray-500 text-xs mb-1 tracking-widest uppercase">
                  Tools
                </span>
                AutoCAD / ArchCAD / Revit / Robot / Excel Sheets
              </div>
              <div className="border-l-2 border-neon-purple pl-4">
                <span className="block text-gray-500 text-xs mb-1 tracking-widest uppercase">
                  Status
                </span>
                Available for Consult, Projects and Jobs.
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue to-neon-purple opacity-20 transform translate-x-4 translate-y-4 rounded-sm" />
            <img
              src="https://picsum.photos/600/600?grayscale"
              alt="Engineer Portrait"
              className="relative z-10 w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 border-2 border-white/10"
            />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue z-20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-purple z-20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-purple z-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-blue z-20" />
          </div>
        </div>

        {/* ── Projects Section ── */}
        <div id="projects">
          <h2 className="text-neon-blue font-sans tracking-[0.2em] mb-2 text-center text-sm uppercase">
            Portfolio
          </h2>
          <h3 className="text-4xl font-display font-bold text-white mb-4 text-center">
            Featured Works
          </h3>
          <p className="text-gray-500 text-center text-sm font-mono mb-12 tracking-widest uppercase">
            {loading
              ? "Loading..."
              : `${projects.length} Project${projects.length !== 1 ? "s" : ""}`}
          </p>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 rounded-sm bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/10 rounded-sm">
              <span className="text-4xl mb-4">🏗️</span>
              <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">
                No projects yet
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Add projects from the admin dashboard.
              </p>
            </div>
          )}

          {/* Project grid */}
          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: Project) => (
                <div
                  key={project.id}
                  className="group relative h-96 overflow-hidden cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/50 to-transparent opacity-90" />

                  {/* Corner accent on hover */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-neon-blue/30 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-neon-blue font-mono text-xs tracking-widest mb-2 block uppercase">
                      {project.category}
                    </span>
                    <h4 className="text-2xl font-display font-bold text-white mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="w-full h-[1px] bg-neon-blue mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

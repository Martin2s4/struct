import React from 'react';
import { PROJECTS } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="bg-structure-gray py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-neon-blue font-sans tracking-[0.2em] mb-2">ABOUT THE ARCHITECT</h2>
            <h3 className="text-4xl font-display font-bold text-white mb-6">Designing for <br/>Resilience</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              With over 15 years of experience in high-density urban planning and structural dynamics, 
              I specialize in creating infrastructure that adapts to its environment. My work focuses 
              on the intersection of classic civil engineering principles and emerging nanotechnologies.
            </p>
            <div className="grid grid-cols-2 gap-4 text-white font-mono text-sm">
                <div className="border-l-2 border-neon-blue pl-4">
                    <span className="block text-gray-500 text-xs mb-1">SPECIALTY</span>
                    Seismic Dampening
                </div>
                <div className="border-l-2 border-neon-purple pl-4">
                    <span className="block text-gray-500 text-xs mb-1">EDUCATION</span>
                    M.S. Structural Eng.
                </div>
                <div className="border-l-2 border-neon-blue pl-4">
                    <span className="block text-gray-500 text-xs mb-1">TOOLS</span>
                    AutoCAD / Python / AI
                </div>
                <div className="border-l-2 border-neon-purple pl-4">
                    <span className="block text-gray-500 text-xs mb-1">STATUS</span>
                    Available for Consult
                </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue to-neon-purple opacity-20 transform translate-x-4 translate-y-4"></div>
            <img 
              src="https://picsum.photos/600/600?grayscale" 
              alt="Engineer Portrait" 
              className="relative z-10 w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 border-2 border-white/10"
            />
          </div>
        </div>

        {/* Projects Section */}
        <div id="projects">
            <h2 className="text-neon-blue font-sans tracking-[0.2em] mb-2 text-center">PORTFOLIO</h2>
            <h3 className="text-4xl font-display font-bold text-white mb-12 text-center">Featured Works</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                    <div key={project.id} className="group relative h-96 overflow-hidden cursor-pointer">
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/50 to-transparent opacity-90"></div>
                        
                        <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-neon-blue font-mono text-xs tracking-widest mb-2 block">{project.category}</span>
                            <h4 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h4>
                            <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                {project.description}
                            </p>
                            <div className="w-full h-[1px] bg-neon-blue mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
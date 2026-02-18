import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-space py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-display text-xl font-bold tracking-widest text-white block mb-1">
            STRUC<span className="text-neon-blue">TURA</span>
          </span>
          <span className="text-gray-500 text-xs font-mono">
            ENGINEERING THE IMPOSSIBLE
          </span>
        </div>
        <div className="flex gap-8 text-gray-400 text-sm font-mono">
          <a href="#" className="hover:text-neon-blue transition-colors">
            LINKEDIN
          </a>
          <a href="#" className="hover:text-neon-blue transition-colors">
            TWITTER
          </a>
        </div>
        <div className="text-gray-600 text-xs">
          © 2042 STRUCTURA INC. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

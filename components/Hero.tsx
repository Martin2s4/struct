import React from "react";

export const Hero: React.FC = () => {
  // REPLACE THIS URL WITH YOUR LOCAL IMAGE PATH (e.g., './blueprint.jpg')
  const bgImage =
    "https://plus.unsplash.com/premium_photo-1676625176020-3bbb1c0adea1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-deep-space">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          /* filter: "grayscale(100%)", */
        }}
      ></div>

      {/* Solid Dark Overlay (No Gradient) */}
      <div className="absolute inset-0 bg-deep-space/85 z-0"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-neon-blue font-sans font-medium tracking-[0.2em] text-sm md:text-base mb-4 animate-fade-in-up">
          CIVIL ENGINEERING
        </h2>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight uppercase neon-text">
          Building the <br />
          <span className="text-neon-blue">Infrastructure</span>
          <br />
          of Tomorrow
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-400 font-light leading-relaxed">
          Merging structural integrity with advanced sustainable technologies.
          We design the skeletal systems of the future cities.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-6 py-2.5 bg-neon-blue/10 border border-neon-blue text-neon-blue font-sans font-bold tracking-wider hover:bg-neon-blue hover:text-deep-space transition-all duration-300 text-sm"
          >
            VIEW PROJECTS
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group relative px-6 py-2.5 bg-neon-blue/10 border border-neon-blue text-neon-blue font-sans font-bold tracking-wider hover:bg-neon-blue hover:text-deep-space transition-all duration-300 text-sm"
          >
            Get In Touch
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

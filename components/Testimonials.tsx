import React, { useState } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marcus Okafor",
    role: "Senior Project Director",
    company: "Meridian Urban Group",
    message:
      "The seismic dampening system designed for our downtown complex exceeded every benchmark we set. Structural integrity was maintained through two significant tremors during construction — remarkable engineering.",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Nambiar",
    role: "Head of Infrastructure",
    company: "NovaBuild Holdings",
    message:
      "Rarely do you encounter an engineer who understands both the poetry and the physics of a structure. The nanotechnology integration into our bridge project was nothing short of visionary.",
    rating: 5,
  },
  {
    id: "3",
    name: "James Whitfield",
    role: "CEO",
    company: "Whitfield & Associates",
    message:
      "Delivered on time, under budget, and with documentation so thorough our own engineers learned from it. A standard of professionalism we hope to work with again.",
    rating: 5,
  },
  {
    id: "4",
    name: "Aiko Tanaka",
    role: "Urban Planning Commissioner",
    company: "City of Harven",
    message:
      "The high-density residential proposal balanced community needs, environmental constraints, and structural demands in a way no other firm had managed. Truly exceptional work.",
    rating: 5,
  },
  {
    id: "5",
    name: "Darius Mensah",
    role: "Lead Architect",
    company: "Forma Studio",
    message:
      "Collaborating with an engineer who speaks the language of design is rare. Every structural decision enhanced the architecture rather than compromising it. A genuine creative partner.",
    rating: 5,
  },
  {
    id: "6",
    name: "Sophia Reinholt",
    role: "Sustainability Director",
    company: "GreenCore Developments",
    message:
      "The sustainable load-bearing framework developed for our zero-carbon campus is now being cited in academic literature. We could not be prouder of what we built together.",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-structure-gray py-20 relative overflow-hidden">
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-16">
          <h2 className="text-neon-blue font-sans tracking-[0.2em] mb-2 text-sm uppercase">
            Client Feedback
          </h2>
          <h3 className="text-4xl font-display font-bold text-white mb-4">
            What They Say
          </h3>
          <div className="w-16 h-[1px] bg-neon-blue mx-auto" />
        </div>

        {/* ── Featured / Active Testimonial ── */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative bg-deep-space border border-white/10 p-10 md:p-14">
            {/* Large quote mark */}
            <div className="absolute top-6 left-8 text-8xl text-neon-blue/10 font-display font-black select-none leading-none">
              "
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-blue" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-purple" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-purple" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-blue" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < TESTIMONIALS[active].rating
                      ? "text-neon-blue"
                      : "text-gray-700"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Message */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic mb-10 relative z-10">
              "{TESTIMONIALS[active].message}"
            </p>

            {/* Divider */}
            <div className="w-12 h-[2px] bg-neon-blue mb-6" />

            {/* Attribution */}
            <div>
              <p className="text-white font-mono font-bold text-sm tracking-wider">
                {TESTIMONIALS[active].name}
              </p>
              <p className="text-gray-500 text-xs font-mono tracking-widest mt-1 uppercase">
                {TESTIMONIALS[active].role} — {TESTIMONIALS[active].company}
              </p>
            </div>
          </div>
        </div>

        {/* ── Selector Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`text-left p-4 border transition-all duration-300 group ${
                active === i
                  ? "border-neon-blue bg-neon-blue/5"
                  : "border-white/10 bg-deep-space hover:border-white/30"
              }`}
            >
              <div
                className={`w-5 h-[2px] mb-3 transition-all duration-300 ${
                  active === i
                    ? "bg-neon-blue"
                    : "bg-gray-700 group-hover:bg-gray-500"
                }`}
              />
              <p
                className={`text-xs font-mono font-bold leading-tight transition-colors duration-300 ${
                  active === i
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-300"
                }`}
              >
                {t.name}
              </p>
              <p
                className={`text-xs font-mono mt-1 leading-tight transition-colors duration-300 ${
                  active === i ? "text-neon-blue" : "text-gray-700"
                }`}
              >
                {t.company}
              </p>
            </button>
          ))}
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-3 gap-px bg-white/5 mt-16">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "40+", label: "Projects Completed" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-structure-gray py-8 text-center"
            >
              <p className="text-3xl md:text-4xl font-display font-black text-neon-blue mb-1">
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs font-mono tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

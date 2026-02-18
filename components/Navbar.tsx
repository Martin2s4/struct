import React, { useState, useEffect } from "react";
import { Section } from "../types";

interface NavbarProps {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollToSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close menu on scroll
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const navItems = [
    { id: Section.HOME, label: "HOME" },
    { id: Section.PROJECTS, label: "PROJECTS" },
    { id: Section.CONTACT, label: "CONTACT" },
  ];

  const handleNavClick = (section: Section) => {
    scrollToSection(section);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-deep-space/95 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick(Section.HOME)}
          >
            <span className="font-display text-2xl font-bold tracking-widest text-white">
              STRUC<span className="text-neon-blue">TURA</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-sans text-sm font-medium tracking-wider transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-neon-blue neon-text"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[2px] bg-neon-blue transition-all duration-300 origin-center ${
                menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-neon-blue transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-4 group-hover:w-6"
              }`}
            />
            <span
              className={`block h-[2px] bg-neon-blue transition-all duration-300 origin-center ${
                menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-deep-space/95 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 font-sans text-sm font-medium tracking-widest transition-all duration-200 border-l-2 ${
                activeSection === item.id
                  ? "text-neon-blue border-neon-blue bg-neon-blue/5"
                  : "text-gray-400 border-transparent hover:text-white hover:border-white/30 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

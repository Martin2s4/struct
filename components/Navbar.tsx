import React, { useState, useEffect } from 'react';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: Section.HOME, label: '01 // HOME' },
    { id: Section.PROJECTS, label: '02 // PROJECTS' },
    { id: Section.CONTACT, label: '03 // CONTACT' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-deep-space/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection(Section.HOME)}>
            <span className="font-display text-2xl font-bold tracking-widest text-white">
              STRUC<span className="text-neon-blue">TURA</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-sans text-sm font-medium tracking-wider transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-neon-blue neon-text'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile Menu Button - Simplified for demo */}
          <div className="md:hidden">
             <span className="text-neon-blue">///</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaTiktok,
  FaTelegram,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-space py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <span className="font-display text-2xl font-bold tracking-widest text-white block mb-2">
            STRUC<span className="text-neon-blue">TURA</span>
          </span>
          <p className="text-gray-500 text-xs font-mono mb-4">
            ENGINEERING THE IMPOSSIBLE
          </p>
          <div className="flex gap-4 text-gray-400">
            <a
              href="https://www.linkedin.com/in/charles-musili-b56aa5395?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              className="hover:text-neon-blue transition-colors text-lg"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.tiktok.com/@charles.musii08?_r=1&_t=ZS-948QbzcabhZ"
              className="hover:text-neon-blue transition-colors text-lg"
            >
              <FaTiktok />
            </a>
            <a
              href="https://t.me/+254110245722"
              className="hover:text-neon-blue transition-colors text-lg"
            >
              <FaTelegram />
            </a>
            {/**/}
            <a
              href="mailto:musilinguli70@gmail.com"
              className="hover:text-neon-blue transition-colors text-lg"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="#home"
                className="hover:text-neon-blue transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-neon-blue transition-colors"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-neon-blue transition-colors"
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-neon-blue transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources 
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide">
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#" className="hover:text-neon-blue transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-neon-blue transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-neon-blue transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-neon-blue transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        */}

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide">
            Stay Updated
          </h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get engineering insights and updates.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-black/40 border border-white/10 text-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue"
            />
            <button
              type="submit"
              className="bg-neon-blue text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-white/5 text-center text-gray-600 text-xs">
        © {currentYear} STRUCTURA INC. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

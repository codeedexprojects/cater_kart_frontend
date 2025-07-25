import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/Logo.png';

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "gallery", "contact"];
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const offset = section.offsetTop - 100; // adjust for header height
          if (window.scrollY >= offset) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm font-serif">

      {/* Main header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logo}
                alt="CaterKart Logo" 
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#home"
                className={`pb-1 font-medium transition-colors ${
                  activeSection === "home" 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-orange-400 hover:text-orange-500"
                }`}
              >
                Home
              </a>
              <a 
                href="#about"
                className={`pb-1 font-medium transition-colors ${
                  activeSection === "about" 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-orange-400 hover:text-orange-500"
                }`}
              >
                About us
              </a>
               <a 
                href="#gallery"
                className={`pb-1 font-medium transition-colors ${
                  activeSection === "gallery" 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-orange-400 hover:text-orange-500"
                }`}
              >
                Gallery
              </a>
               <a 
                href="#contact"
                className={`pb-1 font-medium transition-colors ${
                  activeSection === "contact" 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-orange-400 hover:text-orange-500"
                }`}
              >
                Contact
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <nav className="px-4 py-4 space-y-3">
            <a 
              href="#home"
              className={`block pl-3 py-2 font-medium transition-colors ${
                activeSection === "home" 
                  ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50"
                  : "text-orange-400 hover:text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about"
              className={`block pl-3 py-2 font-medium transition-colors ${
                activeSection === "about" 
                  ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50"
                  : "text-orange-400 hover:text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </a>
            <a 
              href="#gallery"
              className={`block pl-3 py-2 font-medium transition-colors ${
                activeSection === "gallery" 
                  ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50"
                  : "text-orange-400 hover:text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </a>
            <a 
              href="#contact"
              className={`block pl-3 py-2 font-medium transition-colors ${
                activeSection === "contact" 
                  ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50"
                  : "text-orange-400 hover:text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

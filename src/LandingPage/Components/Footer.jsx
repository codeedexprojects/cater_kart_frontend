import React from 'react';
import logo from '../../assets/Logo.png';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-0 font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Blue Line Separator */}
        <div className="flex justify-center mb-12">
          <div className="w-44 h-1  rounded-full" style={{ backgroundColor: "#0A58A3" }}></div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Left Column - Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start">
              {/* Larger Logo */}
              <div className="flex items-center mb-4">
                <img
                  src={logo}
                  alt="CaterKart Logo"
                  className="w-16 h-16 mr-3 object-contain"
                />
                <h3 className="text-2xl font-bold text-gray-800">CaterKart</h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                We make your events seamless, elegant, and stress-free with our premium catering services.
              </p>

              {/* Contact Info */}
              

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links Column 1 */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#home" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links Column 2 */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#careers" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact us
                </a>
              </li>
              <li>
                <a 
                  href="#faqs" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQs
                </a>
              </li>
              <li>
                <a 
                  href="#privacy" 
                  className="text-gray-600 hover:text-orange-500 text-sm transition-colors flex items-center group"
                >
                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Newsletter</h4>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-orange-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm text-center md:text-left mb-2 md:mb-0">
              © 2025 CaterKart. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#terms" className="text-white hover:text-gray-200 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-white hover:text-gray-200 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="text-white hover:text-gray-200 text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
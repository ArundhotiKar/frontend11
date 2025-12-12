import React from "react";
import { Link } from "react-router-dom";
import { X, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-blue-400 transition">Books</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-blue-400 transition">Login / Register</Link>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@bookcourier.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Pabna, Bangladesh
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Follow Us</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <X size={28} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6h4v14H4V10zm6 0h4v2.5c.6-1 2-2.5 4.3-2.5 4.6 0 5.2 3 5.2 7V24h-4v-6c0-1.5 0-3.5-2-3.5s-2 1.5-2 3.5V24h-4V10z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} BookCourier. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

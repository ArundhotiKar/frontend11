import React from "react";
import { X, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400 transition">Home</a>
            </li>
            <li>
              <a href="/books" className="hover:text-blue-400 transition">Books</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-400 transition">Login / Register</a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Contact Us
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={18} /> <a href="mailto:arundhotikar60@gmail.com" className="hover:text-blue-400 transition">arundhotikar60@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> <a href="tel:+8801793003855" className="hover:text-blue-400 transition">+880 1793 003855</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Pabna, Bangladesh
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Follow Me
          </h3>
          <div className="flex items-center gap-4 mt-2">
            {/* X */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <X size={28} />
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/arundhotikar/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6h4v14H4V10zm6 0h4v2.5c.6-1 2-2.5 4.3-2.5 4.6 0 5.2 3 5.2 7V24h-4v-6c0-1.5 0-3.5-2-3.5s-2 1.5-2 3.5V24h-4V10z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/8801793003855" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48a11.94 11.94 0 0 0-16.9 16.9l-1.2 4.4 4.5-1.2a11.94 11.94 0 0 0 13.6-19.9zm-8.52 16a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM15 14.1c-.2-.1-1.2-.6-1.3-.7s-.3-.1-.4.1-.5.7-.6.9-.2.2-.4.1a5.6 5.6 0 0 1-1.6-1a6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4s.2-.3.3-.4.1-.2.2-.4.1-.2 0-.4-.4-1-.6-1.3c-.2-.3-.4-.3-.6-.3s-.4 0-.6 0-.3 0-.5.3-.6.7-.6 1.7.6 2 1 2.3c.4.3.9.8 1.6 1.2.7.4 1.2.6 1.6.8.6.2 1 .2 1.4.1s.8-.3 1-.6.2-.5.2-.6.1-.2 0-.3z"/>
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

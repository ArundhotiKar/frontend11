import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Book, LogOut, User } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navber = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false); // Mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown
  const profileRef = useRef();
//https://timely-flan-484417.netlify.app
  // Apply theme to html tag
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  // Logout handler with toast
  const handleLogout = async () => {
    try {
      await logOut();
      setProfileOpen(false);
      setOpen(false); // Close mobile menu
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed");
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl text-blue-600 dark:text-blue-400"
        >
          <Book size={32} />
          <span>BookCourier</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.name === "Dashboard" && !user) return null;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative group text-gray-800 dark:text-gray-200 font-medium"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
            );
          })}

          {/* Dark / Light Toggle */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-blue-600 dark:border-blue-400"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold">
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col py-2 z-50 animate-fadeIn">
                  <Link
                    to="/my-profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400 font-medium w-full text-left"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 px-6 pb-4 flex flex-col gap-4 animate-slideDown">
          {navLinks.map((link) => {
            if (link.name === "Dashboard" && !user) return null;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </Link>
            );
          })}

          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />

          {!user ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-md transition text-center"
            >
              Login / Register
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-blue-600 dark:border-blue-400"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navber;

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, Book, LogOut } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";

const Navber = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Text-Based Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl text-blue-600 dark:text-blue-400"
        >
          <Book size={32} className="text-blue-600 dark:text-blue-400" />
          <span>BookCourier</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative group text-gray-800 dark:text-gray-200 font-medium"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
            >
              Login / Register
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-600 dark:border-blue-400"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
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

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-800 px-6 pb-4 flex flex-col gap-4 animate-slideDown">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-gray-800 dark:text-gray-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.name}
            </Link>
          ))}

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
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold">
                {user.displayName ? user.displayName.charAt(0) : "U"}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
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

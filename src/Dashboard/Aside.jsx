import React, { useContext, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingCart,
  User,
  FileText,
  BookPlus,
  BookOpen,
  Users,
  Settings,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Aside = () => {
  const { role } = useContext(AuthContext); // "User" | "Librarian" | "Admin"
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // menu class
  const menuItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#DE5499] ${
      isActive ? "bg-[#DE5499]" : ""
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-[#264143] text-white h-screen fixed md:relative z-40
        transition-all duration-300
        ${sidebarOpen ? "md:w-64" : "md:w-20"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center p-4">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <LayoutDashboard size={22} />
              <h1 className="font-bold text-xl">Dashboard</h1>
            </div>
          )}

          {/* Desktop toggle */}
          <button
            className="hidden md:block ml-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>

          {/* Mobile close */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          {/* USER */}
          {role === "User" && (
            <>
              <NavLink to="/dashboard/orders" className={menuItemClass}>
                <ShoppingCart size={20} />
                {sidebarOpen && <span>My Orders</span>}
              </NavLink>

              <NavLink to="/dashboard/profile" className={menuItemClass}>
                <User size={20} />
                {sidebarOpen && <span>My Profile</span>}
              </NavLink>

              <NavLink to="/dashboard/invoices" className={menuItemClass}>
                <FileText size={20} />
                {sidebarOpen && <span>Invoices</span>}
              </NavLink>
            </>
          )}

          {/* LIBRARIAN */}
          {role === "Librarian" && (
            <>
              <NavLink to="/dashboard/add-book" className={menuItemClass}>
                <BookPlus size={20} />
                {sidebarOpen && <span>Add Book</span>}
              </NavLink>

              <NavLink to="/dashboard/my-books" className={menuItemClass}>
                <BookOpen size={20} />
                {sidebarOpen && <span>My Books</span>}
              </NavLink>

              <NavLink to="/dashboard/orders" className={menuItemClass}>
                <ShoppingCart size={20} />
                {sidebarOpen && <span>Orders</span>}
              </NavLink>

              <NavLink to="/dashboard/profile" className={menuItemClass}>
                <User size={20} />
                {sidebarOpen && <span>My Profile</span>}
              </NavLink>
            </>
          )}

          {/* ADMIN */}
          {role === "Admin" && (
            <>
              <NavLink to="/dashboard/all-users" className={menuItemClass}>
                <Users size={20} />
                {sidebarOpen && <span>All Users</span>}
              </NavLink>

              <NavLink to="/dashboard/manage-books" className={menuItemClass}>
                <Settings size={20} />
                {sidebarOpen && <span>Manage Books</span>}
              </NavLink>

              <NavLink to="/dashboard/profile" className={menuItemClass}>
                <User size={20} />
                {sidebarOpen && <span>My Profile</span>}
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-[#264143] text-white p-2 rounded shadow"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>
    </>
  );
};

export default Aside;

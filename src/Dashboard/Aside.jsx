import React, { useState } from "react";
import { Menu, X, Home, User, Settings } from "lucide-react";

const Aside = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // desktop default
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )} */}

      {/* Sidebar */}
      <div
        className={`bg-[#264143] text-white h-full fixed md:relative z-20
          transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-20"} 
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center p-4">
          {sidebarOpen && <h1 className="font-bold text-xl">Dashboard</h1>}
          {/* Close button for mobile */}
          <button
            className="md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={24} />
          </button>
          {/* Collapse button for desktop */}
          <button
            className="hidden md:block ml-auto"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 p-4">
          <a
            href="#"
            className="flex items-center gap-2 hover:bg-[#DE5499] p-3 rounded text-lg"
          >
            <Home size={20} />
            {sidebarOpen && "Home"}
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:bg-[#DE5499] p-3 rounded text-lg"
          >
            <User size={20} />
            {sidebarOpen && "Profile"}
          </a>
          <a
            href="#"
            className="flex items-center gap-2 hover:bg-[#DE5499] p-3 rounded text-lg"
          >
            <Settings size={20} />
            {sidebarOpen && "Settings"}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 
          ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}
      >
        {/* Mobile hamburger */}
        <button
          className="md:hidden mb-4"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
        <p>Main content goes here...</p>
      </div>
    </div>
  );
};

export default Aside;

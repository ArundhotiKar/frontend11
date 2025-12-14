import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";
import Navber from "../Component/Navber";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
       <ToastContainer position="top-center" autoClose={2000} />
      {/* Top Navbar */}
      <Navber />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Aside />

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

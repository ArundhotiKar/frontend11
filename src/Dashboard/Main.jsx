import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";
import { motion } from "framer-motion";

const Main = () => {
  const { role } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Simulate loading (you can replace this with actual API fetch later)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1s delay
    return () => clearTimeout(timer);
  }, []);

  // Sample data
  const ordersData = [
    { month: "Jan", orders: 30 },
    { month: "Feb", orders: 45 },
    { month: "Mar", orders: 60 },
    { month: "Apr", orders: 50 },
    { month: "May", orders: 70 },
  ];

  const usersData = [
    { role: "User", value: 70 },
    { role: "Librarian", value: 20 },
    { role: "Admin", value: 10 },
  ];

  const booksData = [
    { month: "Jan", books: 15 },
    { month: "Feb", books: 25 },
    { month: "Mar", books: 40 },
    { month: "Apr", books: 30 },
    { month: "May", books: 50 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  // Spinner Component
  const Spinner = () => (
    <div className="flex justify-center  items-center py-32">
      <motion.div
        className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );

  if (loading) return <Spinner />;

  return (
    <div className="p-6 md:p-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Welcome to <span className="text-red-600">{role}</span> Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Orders Per Month
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            User Roles
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={usersData}
                dataKey="value"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {usersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Books Added Over Time
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={booksData}>
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="books" stroke="#FF8042" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Main;

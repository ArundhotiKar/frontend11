import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../hook/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [darkMode, setDarkMode] = useState(false); // still for style

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/all-users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Change user role
  const changeRole = async (id, role) => {
    try {
      setLoading(true);
      await axiosSecure.patch(`/users/${id}/role`, { role });
      fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } min-h-screen p-6 transition-colors duration-300`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-2"></div>
            <p className="text-lg font-semibold">Loading users...</p>
          </div>
        </div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className={`${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
              } border rounded-lg p-4 shadow hover:shadow-lg transition`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={user.imageURL}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>

              <p className="mb-4">
                <span className="font-semibold">Role:</span> {user.role}
              </p>

              {/* Only show buttons if the user is not an Admin */}
              {user.role !== "Admin" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => changeRole(user._id, "Librarian")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Make Librarian
                  </button>
                  <button
                    onClick={() => changeRole(user._id, "Admin")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Make Admin
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;

import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users"); // adjust backend route if needed
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Change user role
  const changeRole = async (id, role) => {
    try {
      await axios.patch(`http://localhost:4000/users/${id}/role`, { role });
      fetchUsers(); // refresh after update
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <img
                src={user.imageURL}
                alt={user.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
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
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Make Librarian
                </button>
                <button
                  onClick={() => changeRole(user._id, "Admin")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Make Admin
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;

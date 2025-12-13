import React, { useState } from "react";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "Arundhoti Kar",
    image: "https://via.placeholder.com/150"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <img src={user.image} alt="" className="w-32 h-32 rounded-full mb-4" />

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Image URL"
          onChange={(e) => setUser({ ...user, image: e.target.value })}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [dbUser, setDbUser] = useState(null);
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `https://backend11-kappa.vercel.app/users/profile/${user.email}`
      );
      setDbUser(res.data);
      setName(res.data.name);
      setImageURL(res.data.imageURL);
      setOriginalName(res.data.name);
      setOriginalImage(res.data.imageURL);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (name === originalName && imageURL === originalImage) {
      toast.info("No changes detected");
      return;
    }

    try {
      await updateProfile(user, { displayName: name, photoURL: imageURL });
      await axios.patch(
        `https://backend11-kappa.vercel.app/users/profile/${user.email}`,
        { name, imageURL }
      );
      toast.success("Profile updated successfully");
      setOriginalName(name);
      setOriginalImage(imageURL);
      fetchProfile();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-lg text-gray-400 dark:text-gray-300">
        Loading profile...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-gray-800 dark:bg-gray-900 rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden transition-colors duration-300">

        {/* LEFT PROFILE CARD */}
        <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-pink-600 text-white p-10 flex flex-col items-center justify-center">
          <img
            src={dbUser.imageURL}
            alt={dbUser.name}
            className="w-36 h-36 rounded-full border-4 border-white shadow-xl mb-5 object-cover"
          />
          <h2 className="text-3xl font-bold">{dbUser.name}</h2>
          <p className="opacity-80 mt-1">{dbUser.email}</p>
          <span className="mt-4 px-5 py-2 bg-white/20 rounded-full text-sm font-semibold tracking-wide">
            {dbUser.role}
          </span>
        </div>

        {/* RIGHT EDIT FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-100 dark:text-white">
            Edit Profile
          </h1>

          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-200 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-5 py-3 border border-gray-700 dark:border-gray-600 rounded-xl bg-gray-900 dark:bg-gray-800 text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-2 font-semibold text-gray-200 dark:text-gray-300">
                Image URL
              </label>
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Enter image URL"
                className="w-full px-5 py-3 border border-gray-700 dark:border-gray-600 rounded-xl bg-gray-900 dark:bg-gray-800 text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg hover:scale-105 transition-transform"
            >
              Update Profile
            </button>
          </form>

          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
            Email & role cannot be changed
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

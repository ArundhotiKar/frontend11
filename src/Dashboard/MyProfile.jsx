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

  // 🔹 store original values
  const [originalName, setOriginalName] = useState("");
  const [originalImage, setOriginalImage] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/users/profile/${user.email}`
      );

      setDbUser(res.data);
      setName(res.data.name);
      setImageURL(res.data.imageURL);

      // 🔹 save original values
      setOriginalName(res.data.name);
      setOriginalImage(res.data.imageURL);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // ❌ No change detected
    if (name === originalName && imageURL === originalImage) {
      // toast.info("No changes detected");
      return;
    }

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: imageURL,
      });

      await axios.patch(
        `http://localhost:4000/users/profile/${user.email}`,
        { name, imageURL }
      );

      toast.success("Profile updated successfully");

      // 🔹 update original values after success
      setOriginalName(name);
      setOriginalImage(imageURL);

      fetchProfile();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* LEFT CARD */}
        <div className="bg-gradient-to-br from-indigo-600 to-pink-500 text-white p-8 flex flex-col items-center justify-center">
          <img
            src={dbUser.imageURL}
            alt={dbUser.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
          />
          <h2 className="text-2xl font-bold">{dbUser.name}</h2>
          <p className="opacity-90">{dbUser.email}</p>
          <span className="mt-3 px-4 py-1 bg-white/20 rounded-full text-sm">
            {dbUser.role}
          </span>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Edit Profile
          </h1>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-600">
                Image URL
              </label>
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold hover:opacity-90 transition"
            >
              Update Profile
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            Email & role cannot be changed
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

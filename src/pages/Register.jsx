import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import useAxiosSecure from "../hook/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyle =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 " +
  "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 " +
  "placeholder-gray-400 dark:placeholder-gray-500 " +
  "focus:ring-2 focus:ring-blue-500 outline-none";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setUser, setRole } = useContext(AuthContext);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
    if (!/[a-z]/.test(password)) return "Must contain a lowercase letter";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const photo = form.photo.files[0];

    const error = validatePassword(password);
    if (error) return toast.error(error);
    if (!photo) return toast.error("Please upload a photo");

    try {
      // Upload Image
      const formData = new FormData();
      formData.append("image", photo);
      const imgRes = await axios.post(
        "https://api.imgbb.com/1/upload?key=59eb7243643090e0bb38e5290a4b29e4",
        formData
      );

      const imageURL = imgRes.data.data.url;

      // Create user
      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: name,
        photoURL: imageURL,
      });

      setUser({ ...result.user, displayName: name, photoURL: imageURL });

      await axiosSecure.post("/users", {
        email,
        name,
        imageURL,
        role,
      });

      const roleRes = await fetch(
        `https://backend11-kappa.vercel.app/users/role/${email}`
      );
      const roleData = await roleRes.json();
      setRole(roleData.role);

      toast.success("Account created successfully! 🎉");
      form.reset();

      setTimeout(() => navigate("/"), 1500); // Navigate after toast
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-purple-100 to-blue-200 
    dark:from-gray-900 dark:to-gray-800 px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-900 
      rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
          Create Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-1">
          Join our book community 📚
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">

          {/* Name */}
          <input
            name="name"
            required
            placeholder="Full Name"
            className={inputStyle}
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className={inputStyle}
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Role */}
          <select
            name="role"
            required
            className={`${inputStyle} cursor-pointer`}
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Librarian">Librarian</option>
          </select>

          {/* Photo */}
          <input
            type="file"
            name="photo"
            required
            className={`${inputStyle} cursor-pointer`}
          />

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 
          text-white py-2 rounded-lg font-semibold transition">
            Register
          </button>

          {/* Login */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 
              font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default Register;

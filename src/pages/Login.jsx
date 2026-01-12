import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../hook/useAxiosSecure";

const inputStyle =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 " +
  "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 " +
  "placeholder-gray-400 dark:placeholder-gray-500 " +
  "focus:ring-2 focus:ring-blue-500 outline-none";

const Login = () => {
  const axiosSecure = useAxiosSecure(); // ✅ use axios instance
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, googleLogin, setUser , setRole} = useContext(AuthContext);

  // ---------------------------
  // Email/Password Login
  // ---------------------------
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful! 🎉");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch(() => {
        toast.error("Invalid email or password ❌");
      });
  };

  // ---------------------------
  // Google Login
  // ---------------------------
  const handleGoogleLogin = async () => {
  try {
    const res = await googleLogin();
    const userInfo = res.user;
    setUser(userInfo);

    // Fetch users with your backend
    const { data: users } = await axiosSecure.get(`/users?email=${userInfo.email}`);

    // Check if user exists
    const userExists = users.some(u => u.email === userInfo.email);

    if (!userExists) {
      // Add new user
      const newUser = {
        email: userInfo.email,
        name: userInfo.displayName,
        imageURL: userInfo.photoURL,
        role: "User",
        createdAt: new Date(),
      };
      const postRes = await axiosSecure.post("/users", newUser);
      console.log("New user added:", postRes.data);
    } else {
      console.log("User already exists:", userInfo.email);
    }
       const roleRes = await fetch(
        `https://backend11-kappa.vercel.app/users/role/${userInfo.email}`
      );
      const roleData = await roleRes.json();
      setRole(roleData.role);
    toast.success("Logged in with Google 🚀");
    setTimeout(() => navigate("/"), 1500);
  } catch (err) {
    console.error("Google login error:", err.response || err.message);
    toast.error("Google login failed ❌");
  }
};




  return (
    <div
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-100 to-purple-200
      dark:from-gray-900 dark:to-gray-800 px-4"
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-1">
          Login to your account
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-6 flex items-center justify-center gap-3
            border border-gray-300 dark:border-gray-600
            py-2 rounded-lg font-semibold
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className={inputStyle}
          />

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

          <button
            className="w-full bg-blue-600 hover:bg-blue-700
            text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Login;

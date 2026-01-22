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
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, googleLogin, setUser, setRole } = useContext(AuthContext);

  // ---------------------------
  // Email / Password Login
  // ---------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const res = await logIn(email, password);
      setUser(res.user);
      toast.success("Login successful 🎉");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("Invalid email or password ❌");
    }
  };

  // ---------------------------
  // Google Login
  // ---------------------------
  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const user = res.user;
      setUser(user);

      const { data: users } = await axiosSecure.get(
        `/users?email=${user.email}`
      );

      if (!users.length) {
        await axiosSecure.post("/users", {
          email: user.email,
          name: user.displayName,
          imageURL: user.photoURL,
          role: "User",
          createdAt: new Date(),
        });
      }

      const roleRes = await fetch(
        `https://backend11-kappa.vercel.app/users/role/${user.email}`
      );
      const roleData = await roleRes.json();
      setRole(roleData.role);

      toast.success("Logged in with Google 🚀");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Google login failed ❌");
    }
  };

  // ---------------------------
  // Demo Login (fills form only)
  // ---------------------------
  const handleDemoLogin = () => {
    const demoEmail = "demo@demo.com";
    const demoPassword = "Demo123";

    // Fill the form fields
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    if (emailInput && passwordInput) {
      emailInput.value = demoEmail;
      passwordInput.value = demoPassword;
      toast.info("Demo credentials filled! Click Login 🔑");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-1">
          Login to your account
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-6 flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-2 rounded-lg font-semibold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
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

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Demo Login
        </button>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
          <input
            name="email"
            type="email"
            required
            autoComplete="off"
            placeholder="Email Address"
            className={inputStyle}
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
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

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
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

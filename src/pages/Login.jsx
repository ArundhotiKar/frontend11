import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { logIn, googleLogin, setUser, user } = useContext(AuthContext);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then((result) => {
                const loggedUser = result.user;
                setUser(loggedUser);
                navigate('/');
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
    };


    // 🔥 Google Login Function
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser);
                //console.log(loggedUser.photoURL);
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div className="flex items-center justify-center flex-col text-center min-h-screen mt-3">

            <div className="flex flex-col items-center justify-center bg-[#EDDCD9] border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0_1px_#E99F4C] px-8 py-6">

                <p className="text-[#264143] font-extrabold text-2xl ">LOGIN</p>

                <form onSubmit={handleLogin} className="mt-1">


                    {/* Email */}
                    <div className="flex flex-col items-start my-1">
                        <label className="font-semibold mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0_0_#E99F4C]"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col items-start my-1 relative">
                        <label className="font-semibold mb-1">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px] focus:translate-y-1 focus:shadow-[1px_2px_0_0_#E99F4C]"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>



                    {/* Login Button */}
                    <button
                        className="mt-2 w-[290px] p-4 bg-[#DE5499] font-extrabold rounded-xl shadow-[3px_3px_0_0_#E99F4C] text-[15px] hover:opacity-90 focus:translate-y-1 focus:shadow-[1px_2px_0_0_#E99F4C]"
                    >
                        Login
                    </button>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="mt-3 w-[290px] p-3 bg-white border-2 border-[#264143] font-bold rounded-xl shadow-[3px_3px_0_0_#E99F4C] hover:bg-gray-100 flex items-center justify-center gap-2"
                    >

                        Login with Google
                    </button>

                    {/* Already have account */}
                    <p className="mt-3 font-bold text-[#264143]">
                        “Don’t have an account?{" "}
                        <Link to="/register" className="font-extrabold text-[#264143] underline">
                            Register here
                        </Link>
                    </p>

                </form>
            </div>

        </div>
    );
};

export default Login;
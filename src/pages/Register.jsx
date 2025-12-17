import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { Eye, EyeOff } from 'lucide-react';
import { updateProfile } from "firebase/auth";
import axios from "axios";
import useAxiosSecure from '../hook/useAxiosSecure';

const Register = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, setUser, setRole } = useContext(AuthContext);

    const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.files[0];
    const role = form.role.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    const errorMessage = validatePassword(password);
    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    if (!photoURL) {
        alert("Please upload a photo.");
        return;
    }

    try {
        // Upload photo to IMGBB
        const formData = new FormData();
        formData.append("image", photoURL);

        const res = await axios.post(
            "https://api.imgbb.com/1/upload?key=59eb7243643090e0bb38e5290a4b29e4",
            formData
        );

        if (!res.data.success) throw new Error("Image upload failed");
        const imageURL = res.data.data.url;

        // Create Firebase user
        const result = await createUser(email, password);
        const createdUser = result.user;

        // Update Firebase profile
        await updateProfile(createdUser, {
            displayName: name,
            photoURL: imageURL,
        });

        // Update user in context
        setUser({
            ...createdUser,
            displayName: name,
            photoURL: imageURL
        });

        // Send user to backend
        await axiosSecure.post('/users', { email, password, name, imageURL, role });

        // Immediately fetch role from backend
        const roleRes = await fetch(`http://localhost:4000/users/role/${email}`);
        const roleData = await roleRes.json();
        setRole(roleData.role || null);

        form.reset();
        navigate('/');

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


    const validatePassword = (password) => {
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        if (password.length < 6) return "Password must be at least 6 characters long.";
        if (!uppercase.test(password)) return "Password must contain at least one uppercase letter.";
        if (!lowercase.test(password)) return "Password must contain at least one lowercase letter.";
        return "";
    };

    return (
        <div className="flex items-center justify-center flex-col text-center min-h-screen mt-3">
            <div className="flex flex-col items-center justify-center bg-[#EDDCD9] border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0_1px_#E99F4C] px-8 py-6">
                <p className="text-[#264143] font-extrabold text-2xl ">REGISTER</p>

                <form onSubmit={handleRegister} className="mt-1">
                    {/* Name */}
                    <div className="flex flex-col items-start my-2">
                        <label className="font-semibold mb-1">Name</label>
                        <input name="name" type="text" placeholder="Enter your full name" className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px]" />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col items-start my-1">
                        <label className="font-semibold mb-1">Email</label>
                        <input name="email" type="email" placeholder="Enter your email" className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px]" />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col items-start my-1 relative">
                        <label className="font-semibold mb-1">Password</label>
                        <input name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px]" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-10 text-gray-500">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Role Select */}
                    <div className="flex flex-col items-start my-2">
                        <label className="font-semibold mb-1">Choose Role</label>
                        <select name="role" defaultValue="" required className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px] bg-white cursor-pointer">
                            <option value="" disabled>Select your role</option>
                            <option value="User">User</option>
                            <option value="Librarian">Librarian</option>
                        </select>
                    </div>

                    {/* Photo Upload */}
                    <div className="flex flex-col items-start my-1">
                        <label className="font-semibold mb-1">Photo</label>
                        <input name="photoURL" type="file" className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px]" />
                    </div>

                    <button className="mt-2 w-[290px] p-4 bg-[#DE5499] font-extrabold rounded-xl text-[15px] hover:opacity-90">REGISTER</button>

                    <p className="mt-3 font-bold text-[#264143]">
                        Already have an account? <Link to="/login" className="font-extrabold text-[#264143] underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { Eye, EyeOff } from 'lucide-react';
import { updateProfile } from "firebase/auth"; // ✅ Import added
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { createUser, googleLogin, setUser } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL;
        const file = photoURL.files[0];

        const email = form.email.value;
        const password = form.password.value;

        const errorMessage = validatePassword(password);
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        // 🔥 UPLOAD IMAGE TO IMGBB
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
            "https://api.imgbb.com/1/upload?key=59eb7243643090e0bb38e5290a4b29e4",
            formData
        );

        const imageURL = res.data.data.url; // ✔️ Correct Photo URL
        console.log(imageURL);

        const mainFormdata ={
           email,
           password,
           name,
           imageURL
        }

        if (res.data.success == true) {
           createUser(email, password)
            .then(result => {
                const createdUser = result.user;

                // Update displayName & photoURL
                updateProfile(createdUser, {
                    displayName: name,
                    photoURL: imageURL
                }).then(() => {
                    setUser({
                        ...createdUser,
                        displayName: name,
                        photoURL: imageURL
                    });

                    // send user in backend
                    axios.post('http://localhost:3000/users', mainFormdata)
                    .then(res=>{
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                    form.reset();
                    navigate('/');

                }).catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }

        

    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser); // ✅ Google user already has displayName & photoURL
                navigate('/');
            })
            .catch(error => console.error(error));
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

                    {/* PhotoURL */}
                    <div className="flex flex-col items-start my-1">
                        <label className="font-semibold mb-1">Photo URL</label>
                        <input name="photoURL" type="file" placeholder="Your profile photo URL" className="outline-none border-2 border-[#264143] shadow-[3px_4px_0_1px_#E99F4C] w-[290px] p-3 rounded text-[15px]" />
                    </div>

                    <button className="mt-2 w-[290px] p-4 bg-[#DE5499] font-extrabold rounded-xl text-[15px] hover:opacity-90">REGISTER</button>

                    <button onClick={handleGoogleLogin} type="button" className="mt-3 w-[290px] p-3 bg-white border-2 border-[#264143] font-bold rounded-xl flex items-center justify-center gap-2">Login with Google</button>

                    <p className="mt-3 font-bold text-[#264143]">
                        Already have an account? <Link to="/login" className="font-extrabold text-[#264143] underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
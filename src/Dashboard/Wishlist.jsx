import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchWishlist = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/wishlist?userEmail=${user.email}`
                );
                setWishlist(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load wishlist");
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]);

    const handleRemove = async (bookId) => {
        try {
            await axios.delete(
                `http://localhost:4000/wishlist/${bookId}?userEmail=${user.email}`
            );
            toast.success("Removed from wishlist 💔");
            setWishlist(prev => prev.filter(item => item.bookId !== bookId));
        } catch (err) {
            console.error(err);
            toast.error("Failed to remove from wishlist");
        }
    };

    const handleCardClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    if (!user) return <p className="text-center mt-20 text-lg">Please login to see your wishlist.</p>;
    if (loading) return <p className="text-center mt-20 text-lg">Loading wishlist...</p>;
    if (wishlist.length === 0) return <p className="text-center mt-20 text-gray-500">Your wishlist is empty 😔</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">My Wishlist ❤️</h2>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                {wishlist.map(item => (
                    <div
                        key={item._id}
                        onClick={() => handleCardClick(item.bookId)}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transform transition hover:scale-105 hover:shadow-2xl cursor-pointer"
                    >
                        {/* Book Image */}
                        <div className="relative h-60">
                            <img
                                src={item.imageURL}
                                alt={item.bookName}
                                className="w-full h-full object-cover"
                            />
                            {/* Price Badge */}
                            <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold px-3 py-1 rounded-lg shadow">
                                ₹{item.price}
                            </span>
                        </div>

                        {/* Book Info */}
                        <div className="p-6 flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.bookName}</h3>
                                <p className="text-gray-500 mb-3">✍️ {item.author}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    handleRemove(item.bookId);
                                }}
                                className="mt-4 py-2 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-md"
                            >
                                Remove 💔
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;

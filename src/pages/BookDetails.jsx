import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const BookDetails = () => {
    const { user, role } = useContext(AuthContext);
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/books/${id}`);
                setBook(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch book details');
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const phone = form.phone.value;
        const address = form.address.value;

        const orderData = {
            bookId: book._id,
            bookName: book.name,
            userName: user?.displayName,
            userEmail: user?.email,
            librarianEmail: book.librarianEmail,
            phone,
            address,
            status: "pending",
            paymentStatus: "unpaid",
            createdAt: new Date()
        };

        try {
            await axios.post("http://localhost:4000/orders", orderData);
            toast.success("Order placed successfully!");
            setModalOpen(false);
            form.reset(); // optional
            navigate("/dashboard/orders");
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        }
    };

    const handleAddToWishlist = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        const wishlistData = {
            bookId: book._id,
            bookName: book.name,
            author: book.author,
            price: book.price,
            imageURL: book.imageURL,
            userEmail: user.email,
            createdAt: new Date()
        };

        try {
            await axios.post("http://localhost:4000/wishlist", wishlistData);
            toast.success("Added to wishlist ❤️");
        } catch (error) {
            console.error(error);
            toast.error("Already in wishlist or failed");
        }
    };


    if (loading) return <p className="text-center mt-20 text-lg">Loading book details...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
    if (!book) return <p className="text-center mt-20 text-gray-500">Book not found</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 flex justify-center">
            <div className="max-w-6xl mx-auto mt-12 bg-white rounded-3xl shadow-2xl overflow-hidden flex md:flex-row flex-col items-center">

                {/* Book Image */}
                <div className="md:w-1/2 w-full h-52 md:h-64 relative group">
                    <img
                        src={book.imageURL}
                        alt={book.name}
                        className="w-full h-full object-cover md:rounded-l-3xl transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Price Badge */}
                    <span className="absolute top-3 left-3 bg-blue-600 text-white font-bold px-3 py-1 rounded-lg shadow">
                        ₹{book.price}
                    </span>
                </div>

                {/* Book Info */}
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-start">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{book.name}</h2>
                        <p className="text-gray-500 mb-2">✍️ {book.author}</p>
                        <p className="text-gray-700 text-sm md:text-base line-clamp-5 mb-4">
                            {book.description || "No description available."}
                        </p>

                        {/* Buttons slightly up */}
                        {role === "User" && (
                            <div className="flex gap-3 mb-4">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="flex-1 py-2 md:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
                                >
                                    Order Now
                                </button>

                                <button
                                    onClick={handleAddToWishlist}
                                    className="flex-1 py-2 md:py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                                >
                                    ❤️ Add to Wishlist
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl pointer-events-auto">

                        <h2 className="text-2xl font-bold mb-5 text-center">Place Your Order</h2>

                        <form onSubmit={handleOrderSubmit} className="space-y-4">

                            {/* Name */}
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    readOnly
                                    defaultValue={user?.displayName || ""}
                                    className="border rounded px-3 py-2 bg-gray-100"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    readOnly
                                    defaultValue={user?.email || ""}
                                    className="border rounded px-3 py-2 bg-gray-100"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1">Phone Number</label>
                                <input
                                    name="phone"
                                    type="text"
                                    placeholder="Enter phone number"
                                    required
                                    className="border rounded px-3 py-2"
                                />
                            </div>

                            {/* Address */}
                            <div className="flex flex-col">
                                <label className="font-semibold mb-1">Address</label>
                                <textarea
                                    name="address"
                                    placeholder="Enter address"
                                    required
                                    rows={3}
                                    className="border rounded px-3 py-2"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Place Order
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default BookDetails;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        }
    };

    if (loading) return <p className="text-center mt-20 text-lg">Loading book details...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
    if (!book) return <p className="text-center mt-20 text-gray-500">Book not found</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 flex justify-center">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full grid md:grid-cols-2 gap-6 overflow-hidden">

                {/* Book Image */}
                <div className="relative">
                    <img
                        src={book.imageURL}
                        alt={book.name}
                        className="w-full h-full object-cover md:rounded-l-2xl"
                    />
                </div>

                {/* Book Info */}
                <div className="p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-3">{book.name}</h2>
                        <p className="text-lg text-gray-600 mb-2">Author: <span className="font-semibold">{book.author}</span></p>
                        <p className="text-gray-700 mb-4">{book.description || 'No description available.'}</p>
                        <p className="text-2xl font-bold text-blue-600 mb-6">₹{book.price}</p>
                    </div>

                    {role === "User" && (
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
                        >
                            Order Now
                        </button>
                    )}

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

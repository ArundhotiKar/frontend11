import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';

const BookDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ phone: '', address: '' });
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

    const handleInputChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handlePlaceOrder = async () => {
        if (!form.phone || !form.address) return alert('Please fill all fields');

        const orderData = {
            bookId: book._id,
            bookName: book.name,
            userName: user?.displayName || '',
            userEmail: user?.email || '',
            phone: form.phone,
            address: form.address,
            status: 'pending',
            paymentStatus: 'unpaid',
            createdAt: new Date()
        };

        try {
            await axios.post('http://localhost:4000/orders', orderData);
            alert('Order placed successfully!');
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Failed to place order');
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
                        src={book.image}
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

                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
                    >
                        Order Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 md:p-8 shadow-2xl relative pointer-events-auto">
                        {/* Modal Content */}
                        <h2 className="text-2xl font-bold mb-5 text-center">Place Your Order</h2>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                            />
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Phone Number"
                            />
                            <textarea
                                name="address"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                placeholder="Address"
                                rows={3}
                            ></textarea>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePlaceOrder}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default BookDetails;

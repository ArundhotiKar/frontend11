import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { id } = useParams(); 
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/books/${id}`);
                setBook(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch book details");
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!book) return <p className="text-center mt-10">Book not found</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl w-full">
                <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-3xl font-bold mb-2">{book.name}</h2>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p className="text-gray-700 mb-4">{book.description || "No description available."}</p>
                <p className="text-xl font-semibold">Price: ₹{book.price}</p>
            </div>
        </div>
    );
};

export default BookDetails;

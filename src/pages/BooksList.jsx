import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/books")
            .then(res => {
                console.log("Books from backend:", res.data);
                setBooks(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    // Navigate to details page
    const goToBookDetails = (id) => {
        navigate(`/books/${id}`); 
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">📚 All Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books
                    .filter(book => book.status === "published")
                    .map((book) => (
                        <div
                            key={book._id}
                            className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition"
                            onClick={() => goToBookDetails(book._id)}
                        >
                            <img
                                src={book.image}
                                alt={book.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold">{book.name}</h3>
                            <p className="text-gray-600">{book.author}</p>
                            <p className="mt-2 font-bold">Price: ₹{book.price}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BooksList;

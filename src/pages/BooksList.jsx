import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/books")
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    // Navigate to details page
    const goToBookDetails = (id) => {
        navigate(`/books/${id}`); 
    }

    // Filter and sort books
    const filteredBooks = books
        .filter(book => book.status === "published")
        .filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") return a.price - b.price;
            if (sortOrder === "desc") return b.price - a.price;
            return 0;
        });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">📚 All Books</h2>

            {/* Search & Sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search by book name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/3"
                />

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-2 rounded w-full md:w-1/6"
                >
                    <option value="">Sort by price</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                    <div
                        key={book._id}
                        className="bg-white shadow-lg rounded-xl p-4 cursor-pointer hover:shadow-2xl transition"
                        onClick={() => goToBookDetails(book._id)}
                    >
                        <img
                            src={book.imageURL}
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

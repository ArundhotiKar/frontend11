import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true); // <-- Loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://backend11-kappa.vercel.app/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const goToBookDetails = (id) => {
    navigate(`/books/${id}`);
  };

  const filteredBooks = books
    .filter((book) => book.status === "published")
    .filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  // --- Loading Spinner Component ---
  const Spinner = () => (
    <div className="flex justify-center items-center py-32">
      <motion.div
        className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        📚 All Books
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            p-2 rounded w-full md:w-1/3
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="
            border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            p-2 rounded w-full md:w-1/6
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="">Sort by price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <Spinner />
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 mt-16 text-lg">
          No books found.
        </p>
      ) : (
        // Book Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
              onClick={() => goToBookDetails(book._id)}
              className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-lg dark:shadow-none
                rounded-xl p-4 cursor-pointer
                hover:scale-105 transition duration-300
              "
            >
              <img
                src={book.imageURL}
                alt={book.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {book.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">{book.author}</p>

              <p className="mt-2 font-bold text-green-600 dark:text-green-400">
                Price: ₹{book.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;

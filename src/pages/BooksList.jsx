import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
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

  // Loading Spinner
  const Spinner = () => (
    <div className="flex justify-center items-center py-32">
      <motion.div
        className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );

  return (
    <div className=" bg-gray-100 dark:bg-gray-600 p-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <motion.div
              key={book._id}
              onClick={() => goToBookDetails(book._id)}
              whileHover={{ scale: 1.05 }}
              className="
                relative
                bg-white/80 dark:bg-gray-800/80
                backdrop-blur-md
                border border-gray-200 dark:border-gray-700
                rounded-2xl p-4 cursor-pointer
                shadow-lg dark:shadow-none
                overflow-hidden
                transition-all duration-300
                h-72
              "
            >
              {/* Book Image */}
              <div className="relative w-full h-40 mb-3 rounded-xl overflow-hidden">
                <img
                  src={book.imageURL}
                  alt={book.name}
                  className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow">
                  ₹{book.price}
                </span>
              </div>

              {/* Book Info */}
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 truncate">
                {book.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                {book.author}
              </p>

              <div className="flex justify-between items-center mt-2 text-sm">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Available
                </span>
                <span className="text-yellow-500 font-medium text-xs">
                  ★ {book.rating || 0}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksList;

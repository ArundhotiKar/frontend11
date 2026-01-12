import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const LatestBooksSection = () => {
  const [books, setBooks] = useState([]);
  const [ratingsMap, setRatingsMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooksAndRatings = async () => {
      try {
        // 1️⃣ Fetch all books
        const booksRes = await axios.get(
          "https://backend11-kappa.vercel.app/books"
        );

        const publishedBooks = booksRes.data.filter(
          (book) => book.status === "published"
        );

        setBooks(publishedBooks);

        // 2️⃣ Fetch rating for each book
        const ratingRequests = publishedBooks.map((book) =>
          axios
            .get(
              `https://backend11-kappa.vercel.app/ratings/${book._id}`
            )
            .then((res) => ({
              bookId: book._id,
              avgRating: res.data.averageRating || 0,
            }))
            .catch(() => ({
              bookId: book._id,
              avgRating: 0,
            }))
        );

        const ratings = await Promise.all(ratingRequests);

        // 3️⃣ Convert to map
        const map = {};
        ratings.forEach((r) => {
          map[r.bookId] = r.avgRating;
        });

        setRatingsMap(map);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooksAndRatings();
  }, []);

  const goToBookDetails = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <section className="mt-10 mb-10 px-4">
      <h1 className="text-3xl text-blue-600 dark:text-blue-400 mb-8 text-center font-bold">
        Latest Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.slice(0, 6).map((book) => (
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
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
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
                ★ {ratingsMap[book._id] ?? 0}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestBooksSection;

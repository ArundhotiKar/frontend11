import React from "react";
import { motion } from "framer-motion";

const genres = [
  { name: "Fiction", img: "https://via.placeholder.com/150?text=Fiction" },
  { name: "Science", img: "https://via.placeholder.com/150?text=Science" },
  { name: "Mystery", img: "https://via.placeholder.com/150?text=Mystery" },
  { name: "Romance", img: "https://via.placeholder.com/150?text=Romance" },
  { name: "Technology", img: "https://via.placeholder.com/150?text=Technology" },
  { name: "History", img: "https://via.placeholder.com/150?text=History" },
];

export default function PopularGenresSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-extrabold text-blue-900 dark:text-blue-400">
          Browse by Popular Genres
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Discover books from your favorite categories and explore new worlds.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {genres.map((genre, index) => (
          <motion.div
            key={genre.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center p-4"
          >
            <img
              src={genre.img}
              alt={genre.name}
              className="h-24 w-full object-contain mb-4 rounded-lg"
            />
            <p className="text-center font-semibold text-gray-800 dark:text-gray-200">
              {genre.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

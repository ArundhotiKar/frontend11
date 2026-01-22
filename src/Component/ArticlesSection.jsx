import React from "react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "5 Tips for Reading More Books",
    img: "https://via.placeholder.com/300x200?text=Reading+Tips",
    excerpt: "Discover simple ways to increase your reading habits and enjoy more books daily.",
  },
  {
    title: "Top 10 Mystery Novels to Try",
    img: "https://via.placeholder.com/300x200?text=Mystery+Novels",
    excerpt: "From classic whodunits to modern thrillers, explore the best mystery novels this year.",
  },
  {
    title: "How Libraries Are Adapting to Digital Age",
    img: "https://via.placeholder.com/300x200?text=Digital+Libraries",
    excerpt: "Learn how libraries are innovating to provide access to books online and at home.",
  },
  {
    title: "Benefits of Reading Every Day",
    img: "https://via.placeholder.com/300x200?text=Reading+Benefits",
    excerpt: "Daily reading can improve focus, creativity, and knowledge. Here’s why it matters.",
  },
];

export default function ArticlesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-extrabold text-blue-900 dark:text-blue-400">
          Latest Articles
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Stay informed and inspired with our latest articles, tips, and book recommendations.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={article.img}
              alt={article.title}
              className="rounded-t-2xl w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.excerpt}
              </p>
              <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

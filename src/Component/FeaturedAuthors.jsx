import { motion } from "framer-motion";

const authors = [
  {
    name: "J.K. Rowling",
    books: 12,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "George R.R. Martin",
    books: 10,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Agatha Christie",
    books: 85,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Stephen King",
    books: 70,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const FeaturedAuthors = () => {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Featured Authors
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover the minds behind your favorite books
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-8xl mx-auto">
        {authors.map((author, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">
              {author.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {author.books} books
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuthors;

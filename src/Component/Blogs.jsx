import { motion } from "framer-motion";

const blogs = [
  {
    title: "Top 10 Books to Read in 2026",
    excerpt: "Discover the most trending books this year and why you shouldn't miss them.",
    image: "https://source.unsplash.com/400x300/?books,reading",
    link: "/blogs/1",
  },
  {
    title: "How BookCourier Makes Library Delivery Easy",
    excerpt: "A complete guide on how our system simplifies book borrowing and returning.",
    image: "https://source.unsplash.com/400x300/?library,books",
    link: "/blogs/2",
  },
  {
    title: "Tips for Choosing Your Next Read",
    excerpt: "Practical tips and tricks to pick the perfect book for your taste.",
    image: "https://source.unsplash.com/400x300/?reading,bookshelf",
    link: "/blogs/3",
  },
];

const Blogs = () => {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          From Our Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Stay updated with tips, trends, and insights from the world of books.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.excerpt}</p>
              <a
                href={blog.link}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;

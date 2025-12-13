import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ayesha Rahman",
    text: "Fast delivery and excellent service! BookCourier never disappoints.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Rafiq Islam",
    text: "Loved the wide selection of books and smooth ordering process.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Mithila Das",
    text: "Reliable, trustworthy, and super fast delivery!",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
  {
    name: "Sabbir Hossain",
    text: "Amazing service and support! Highly recommended for book lovers.",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg">
          Thousands of readers trust BookCourier for their book deliveries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="flex items-center mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500"
              />
              <h4 className="font-semibold text-gray-800">{t.name}</h4>
            </div>
            <p className="text-gray-600 text-sm">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

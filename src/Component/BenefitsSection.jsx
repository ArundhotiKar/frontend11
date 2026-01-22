import React from "react";
import { FaShippingFast, FaBookOpen, FaUsers, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <FaShippingFast size={36} className="text-green-600 dark:text-green-400" />,
    title: "Fast Delivery",
    description: "Get your favorite books delivered to your doorstep quickly and safely."
  },
  {
    icon: <FaBookOpen size={36} className="text-green-600 dark:text-green-400" />,
    title: "Wide Collection",
    description: "Explore a huge library of books across all genres and topics."
  },
  {
    icon: <FaUsers size={36} className="text-green-600 dark:text-green-400" />,
    title: "Community Reviews",
    description: "Read honest reviews from other readers before borrowing books."
  },
  {
    icon: <FaShieldAlt size={36} className="text-green-600 dark:text-green-400" />,
    title: "Secure & Reliable",
    description: "Your account and orders are always safe with our secure platform."
  }
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl font-extrabold text-blue-900 dark:text-blue-400">
          Why Choose BookCourier?
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Discover the key benefits that make BookCourier the preferred online library delivery platform.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{benefit.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

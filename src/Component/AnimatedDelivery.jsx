import React from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";

const AnimatedDelivery = () => {
  const books = Array.from({ length: 6 });

  return (
    <section className="
      relative py-28 overflow-hidden
      bg-gradient-to-b 
      from-blue-500 to-indigo-600
      dark:from-gray-900 dark:to-gray-800
    ">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white dark:text-gray-100">
          Delivering Books Everywhere
        </h2>
        <p className="text-lg md:text-xl mb-10 text-blue-100 dark:text-gray-400">
          BookCourier brings your favorite books directly to your doorstep, fast and reliably.
        </p>
      </div>

      {/* Animated books */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {books.map((_, index) => {
          const delay = index * 1.2;
          return (
            <motion.div
              key={index}
              className="absolute text-white/90 dark:text-blue-400"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 14 + index * 2,
                ease: "linear",
                delay,
              }}
              style={{
                top: "50%",
                left: "50%",
              }}
            >
              <motion.div
                style={{ y: -120 }}
                animate={{ y: [-120, 120, -120] }}
                transition={{
                  repeat: Infinity,
                  duration: 6 + index,
                  ease: "easeInOut",
                  delay,
                }}
              >
                <Book size={34} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AnimatedDelivery;

import React from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";

const AnimatedDelivery = () => {
  const books = Array.from({ length: 6 });

  return (
    <section className="relative py-28 bg-gradient-to-b from-pink-500 to-purple-600 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center text-white relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Delivering Books Everywhere
        </h2>
        <p className="text-lg md:text-xl mb-10">
          BookCourier brings your favorite books directly to your doorstep, fast and reliably.
        </p>
      </div>

      {/* Circular animated path */}
      <div className="absolute inset-0 flex justify-center items-center">
        {books.map((_, index) => {
          const delay = index * 1.5;
          return (
            <motion.div
              key={index}
              className="absolute text-white"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 12 + index * 2,
                ease: "linear",
                delay: delay,
              }}
              style={{
                transformOrigin: "50% 50%",
                top: "50%",
                left: "50%",
              }}
            >
              <motion.div
                className="absolute"
                style={{
                  x: 0,
                  y: -120,
                }}
                animate={{ y: [-120, 120, -120] }}
                transition={{
                  repeat: Infinity,
                  duration: 6 + index,
                  ease: "easeInOut",
                  delay: delay,
                }}
              >
                <Book size={36} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AnimatedDelivery;

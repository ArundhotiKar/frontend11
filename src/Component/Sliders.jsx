import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Academic Books",
    description: "Get textbooks and reference books delivered from nearby libraries.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: 2,
    title: "Fiction & Novels",
    description: "Explore novels, stories, and literature at your doorstep.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 3,
    title: "Research Materials",
    description: "Borrow journals and research books without visiting libraries.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
];

const Sliders = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center">
            <div className="text-white px-10 max-w-xl">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="mb-6 text-lg">{slide.description}</p>
              <Link
                to="/books"
                className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200"
              >
                View All Books
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sliders;

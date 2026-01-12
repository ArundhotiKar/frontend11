import { useEffect, useState } from "react";

const statsData = [
  { label: "Total Users", value: 1200 },
  { label: "Books Delivered", value: 8500 },
  { label: "Libraries Partnered", value: 35 },
  { label: "Satisfied Customers", value: 5000 },
];

const Statistics = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, i) => {
      const increment = Math.ceil(stat.value / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[i] < stat.value) {
            newCounts[i] += increment;
            if (newCounts[i] > stat.value) newCounts[i] = stat.value;
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Our Impact in Numbers
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
          BookCourier has been connecting readers with libraries efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto text-center">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="
              bg-white dark:bg-gray-800 
              rounded-3xl p-10 
              shadow-lg dark:shadow-none 
              hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300
              flex flex-col items-center justify-center
            "
          >
            <h3 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 mb-3">
              {counts[index].toLocaleString()}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg md:text-xl">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;

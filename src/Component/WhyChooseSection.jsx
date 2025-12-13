import React from "react";
import { Truck, ShieldCheck, Star, Clock } from "lucide-react";

const features = [
  {
    icon: <Truck size={32} className="text-white" />,
    title: "Fast Delivery",
    description: "Get your books delivered quickly, right to your doorstep.",
    color: "bg-blue-500",
  },
  {
    icon: <ShieldCheck size={32} className="text-white" />,
    title: "Secure & Reliable",
    description: "We ensure safe delivery and handle your orders with care.",
    color: "bg-green-500",
  },
  {
    icon: <Star size={32} className="text-white" />,
    title: "Wide Selection",
    description: "Find books from all genres, curated for your taste.",
    color: "bg-yellow-500",
  },
  {
    icon: <Clock size={32} className="text-white" />,
    title: "24/7 Support",
    description: "Our support team is always ready to assist you anytime.",
    color: "bg-red-500",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Why Choose BookCourier?
        </h2>
        <p className="text-gray-600 text-lg">
          Discover why thousands of readers trust BookCourier for their book deliveries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transform transition duration-300"
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${feature.color}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;

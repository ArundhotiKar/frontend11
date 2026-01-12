import React from "react";
import { Search, ShoppingCart, Truck, Repeat } from "lucide-react";

const steps = [
  {
    icon: <Search size={40} className="text-white" />,
    title: "Search Books",
    description: "Browse books from your nearby libraries easily.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <ShoppingCart size={40} className="text-white" />,
    title: "Place Order",
    description: "Select the book and place an order in a few clicks.",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: <Truck size={40} className="text-white" />,
    title: "Get Delivery",
    description: "Receive the book at your doorstep quickly.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <Repeat size={40} className="text-white" />,
    title: "Return Books",
    description: "Schedule a pickup to return books conveniently.",
    color: "from-blue-500 to-blue-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-8xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-12 transition-colors duration-500">
          How BookCourier Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300
                bg-gradient-to-br ${step.color} hover:scale-105`}
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-white/90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

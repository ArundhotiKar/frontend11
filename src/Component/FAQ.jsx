import { useState } from "react";

const faqs = [
  {
    question: "How do I order a book from BookCourier?",
    answer: "Simply browse our catalog, go to the book details page, click 'Order Now', fill in your information, and submit the order. The status will be pending until processed.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Yes, if your order status is 'pending', you can cancel it from your dashboard under 'My Orders'.",
  },
  {
    question: "How do I track my book delivery?",
    answer: "You can track your orders in your dashboard under 'My Orders'. The status will update as your book moves from 'pending' to 'shipped' to 'delivered'.",
  },
  {
    question: "Do I need a library card to use BookCourier?",
    answer: "No, BookCourier allows you to order books directly with your account on our platform. No library card is required.",
  },
  {
    question: "Can I add a book to my wishlist?",
    answer: "Yes, from the book details page, click the 'Add to Wishlist' button. Your wishlisted books will appear under 'My Wishlist' in your dashboard.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Answers to the most common queries about BookCourier
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center text-gray-800 dark:text-gray-100 font-medium focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

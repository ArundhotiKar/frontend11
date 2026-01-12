import React, { useContext, useState } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const PaymentPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Assume price & orderId passed via state (from MyOrders)
//   const orderId = window.history.state?.usr?.orderId;
//   const price = window.history.state?.usr?.price;
  // Get order details from navigation state
const { orderId, price, bookName } = window.history.state?.usr || {};


  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: price,
        email: user?.email,
        name: user?.displayName,
        orderId,
        bookName
      });

      window.location.href = res.data.url; // Stripe checkout redirect
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Payment failed! Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handlePayment}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          💳 Pay Now
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
            Amount
          </label>
          <input
            type="number"
            value={price || ""}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Redirecting..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;

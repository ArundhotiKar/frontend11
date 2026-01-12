import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hook/useAxiosSecure";

const InvoicesPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user, axiosSecure]);

  // ✅ Spinner Component
  const Spinner = () => (
    <div className="flex justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        💳 My Payments
      </h2>

      {/* ✅ Loading */}
      {loading ? (
        <Spinner />
      ) : payments.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No payments found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => (
            <div
              key={payment.transactionId}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Transaction ID:
                </span>
                <span className="text-xs font-mono break-all text-gray-700 dark:text-gray-200">
                  {payment.transactionId}
                </span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Amount:
                </span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  ${payment.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Date:
                </span>
                <span className="text-gray-700 dark:text-gray-200">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true); // start loading
    axios
      .get(`https://backend11-kappa.vercel.app/my-orders?email=${user.email}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false)); // stop loading
  }, [user]);

  const cancelOrder = async (id) => {
    await axios.patch(`https://backend11-kappa.vercel.app/orders/cancel/${id}`);

    setOrders(prev =>
      prev.map(order =>
        order._id === id
          ? { ...order, status: "cancelled", paymentStatus: "cancelled" }
          : order
      )
    );
  };

  const payNow = (orderId, price, bookName) => {
    navigate("/pay-now", { state: { orderId, price, bookName } });
  };

  // 🔹 Loading Spinner Component
  const Spinner = () => (
    <div className="flex justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        📦 My Orders
      </h2>

      {loading ? (
        <Spinner />
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No orders found 🛒
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-300">Book</th>
                  <th className="p-3 text-left text-gray-700 dark:text-gray-300">Order Date</th>
                  <th className="p-3 text-center text-gray-700 dark:text-gray-300">Status</th>
                  <th className="p-3 text-center text-gray-700 dark:text-gray-300">Payment</th>
                  <th className="p-3 text-center text-gray-700 dark:text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                {orders.map(order => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">{order.bookName}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                              : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      {order.paymentStatus !== "paid" && (
                        <>
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-red-500 hover:bg-red-600 text-white transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => payNow(order._id, order.price, order.bookName)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
                          >
                            Pay Now
                          </button>

                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {orders.map(order => (
              <div
                key={order._id}
                className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 shadow-md"
              >
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">{order.bookName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Ordered on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Status:</span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full
                    ${order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Payment:</span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full
                    ${order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                {order.paymentStatus !== "paid" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => payNow(order._id, order.price, order.bookName)}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
                    >
                      Pay Now
                    </button>

                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;

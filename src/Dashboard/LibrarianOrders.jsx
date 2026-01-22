import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const LibrarianOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Fetch librarian orders
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://backend11-kappa.vercel.app/orders/librarian/${user.email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // 🔁 Update Order Status
  const handleStatusChange = async (id, newStatus) => {
    await axios.patch(`https://backend11-kappa.vercel.app/orders/status/${id}`, {
      status: newStatus,
    });

    setOrders((prev) =>
      prev.map((order) => (order._id === id ? { ...order, status: newStatus } : order))
    );
  };

  // ❌ Cancel Order
  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    await axios.patch(`https://backend11-kappa.vercel.app/orders/cancel/${id}`);

    setOrders((prev) =>
      prev.map((order) =>
        order._id === id
          ? { ...order, status: "cancelled", paymentStatus: "cancelled" }
          : order
      )
    );
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-700 dark:text-gray-300">Loading orders...</p>;
  }

  return (
    <div className="p-4 lg:p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-blue-900 dark:text-blue-400">
        My Book Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">No orders found.</p>
      ) : isMobile ? (
        // 📱 MOBILE VIEW (CARD)
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 transition hover:shadow-md"
            >
              <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-300">
                {order.bookName}
              </h3>

              <p><b>User:</b> {order.userName}</p>
              <p><b>Email:</b> {order.userEmail}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>

              {/* STATUS */}
              <div className="mt-2">
                <b>Status:</b>{" "}
                {order.status === "cancelled" || order.status === "delivered" ? (
                  <span
                    className={`font-semibold capitalize ml-1 ${
                      order.status === "delivered" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                ) : (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border px-2 py-1 rounded ml-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                )}
              </div>

              {/* PAYMENT */}
              <div className="mt-2">
                <b>Payment:</b>{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-sm ml-1 ${
                    order.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>

              {/* ACTION */}
              {order.status !== "cancelled" && order.status !== "delivered" && (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        // 🖥️ DESKTOP VIEW (TABLE)
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="border p-2">Book</th>
                <th className="border p-2">User</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Payment</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white dark:bg-gray-800 border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="border p-2 text-blue-900 dark:text-blue-300 font-semibold">{order.bookName}</td>

                  <td className="border p-2">
                    {order.userName} <br />
                    <small>{order.userEmail}</small>
                  </td>

                  <td className="border p-2">{order.phone}</td>
                  <td className="border p-2">{order.address}</td>

                  {/* STATUS */}
                  <td className="border p-2">
                    {order.status === "cancelled" || order.status === "delivered" ? (
                      <span
                        className={`font-semibold capitalize ${
                          order.status === "delivered" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    ) : (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    )}
                  </td>

                  {/* PAYMENT */}
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        order.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="border p-2">
                    {order.status !== "cancelled" && order.status !== "delivered" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LibrarianOrders;

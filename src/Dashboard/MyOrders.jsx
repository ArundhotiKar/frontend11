import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:4000/my-orders?email=${user.email}`)
      .then(res => setOrders(res.data));
  }, [user]);

  const cancelOrder = async (id) => {
    await axios.patch(`http://localhost:4000/orders/cancel/${id}`);

    setOrders(prev =>
      prev.map(order =>
        order._id === id ? { ...order, status: "cancelled" } : order
      )
    );
  };

  const payNow = async (id) => {
    // 👉 normally navigate to payment page
    // navigate(`/payment/${id}`);

    // demo direct payment success
    await axios.patch(`http://localhost:4000/orders/pay/${id}`);

    setOrders(prev =>
      prev.map(order =>
        order._id === id ? { ...order, paymentStatus: "paid" } : order
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📦 My Orders</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Book</th>
            <th className="border p-2">Order Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="text-center">

              <td className="border p-2 font-semibold">
                {order.bookName}
              </td>

              <td className="border p-2">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="border p-2">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    order.status === "pending"
                      ? "bg-yellow-500"
                      : order.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="border p-2">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    order.paymentStatus === "paid"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>

              <td className="border p-2 space-x-2">
                {/* Cancel Button */}
                {order.status === "pending" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Cancel
                  </button>
                )}

                {/* Pay Now Button */}
                {order.status === "pending" &&
                  order.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => payNow(order._id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Pay Now
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;

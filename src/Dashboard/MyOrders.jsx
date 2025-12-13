import React, { useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, bookTitle: "Clean Code", date: "2025-12-01", status: "pending" },
    { id: 2, bookTitle: "JavaScript Guide", date: "2025-11-20", status: "paid" }
  ]);

  const handleCancel = (id) => {
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, status: "cancelled" } : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Book</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="text-center">
              <td className="border p-2">{order.bookTitle}</td>
              <td className="border p-2">{order.date}</td>
              <td className="border p-2">{order.status}</td>

              <td className="border p-2 space-x-2">
                {order.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => alert("Go to payment page")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
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
  );
};

export default MyOrders;

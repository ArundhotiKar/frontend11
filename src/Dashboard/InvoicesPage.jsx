import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hook/useAxiosSecure";

const InvoicesPage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        setPayments(res.data);
      } catch (err) {
        console.error("Failed to fetch payments:", err);
      }
    };

    fetchPayments();
  }, [user, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">💳 My Payments</h2>

      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.transactionId} className="text-center">
                <td className="border p-2 font-mono">{payment.transactionId}</td>
                <td className="border p-2">${payment.amount.toFixed(2)}</td>
                <td className="border p-2">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoicesPage;

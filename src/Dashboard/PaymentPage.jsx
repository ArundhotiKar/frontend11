import React, { useContext } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation } from "react-router";

const PaymentPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const orderId = location.state?.orderId;
    const price = location.state?.price;

    const handlePayment = async (event) => {
        event.preventDefault();
        const form = event.target;

        const payAmount = Number(form.payAmount.value);

        if (!payAmount || payAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        try {
            const res = await axiosSecure.post("/create-payment-intent", {
                amount: payAmount,
                email: user?.email,
                name: user?.displayName,
                orderId: orderId
            });

            console.log("Payment Intent Response:", res.data);
            window.location.href = res.data.url;

            // 🔜 next step: Stripe confirmCardPayment / redirect
        } catch (error) {
            console.error("Error creating payment intent:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handlePayment} className="w-80 p-6 border rounded-lg shadow">
                <h1 className="text-center font-bold text-red-500 text-2xl mb-4">
                    Pay Now
                </h1>

                <input
                    type="number"
                    name="payAmount"
                    //placeholder="Enter amount"
                    value={price}
                    className="w-full px-3 py-2 border rounded mb-4"
                    required
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Pay
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;

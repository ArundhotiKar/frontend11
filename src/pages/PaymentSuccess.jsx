import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../hook/useAxiosSecure';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const res = await axiosSecure.post(`/success-payment?session_id=${sessionId}`);
                console.log('Payment confirmation response:', res.data);
                if (res.data.success) {
                    toast.success("Payment successful! Your order is confirmed.", {
                        position: "top-center",
                        autoClose: 3000,
                    });

                    setTimeout(() => {
                        navigate("/dashboard/orders");
                    }, 3000);
                }
            } catch (error) {
                console.error('Error confirming payment:', error);
            }


        };

        confirmPayment();

    }, [sessionId, axiosSecure]);

    return (
        <div className='text-center font-bold text-green-600 text-2xl mt-20'>
            Payment Successful! ✅
        </div>
    );
};

export default PaymentSuccess;
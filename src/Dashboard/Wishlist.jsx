import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();

        const res = await axios.get(
          `https://backend11-kappa.vercel.app/wishlist?userEmail=${user.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setWishlist(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(
        `https://backend11-kappa.vercel.app/wishlist/${bookId}?userEmail=${user.email}`
      );

      toast.success("Removed from wishlist 💔");
      setWishlist((prev) => prev.filter((item) => item.bookId !== bookId));
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleCardClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  // Spinner
  const Spinner = () => (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="w-14 h-14 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user)
    return (
      <p className="text-center mt-24 text-lg text-gray-600 dark:text-gray-400">
        Please login to see your wishlist.
      </p>
    );

  if (loading) return <Spinner />;

  if (wishlist.length === 0)
    return (
      <p className="text-center mt-24 text-gray-500 dark:text-gray-400 text-lg">
        Your wishlist is empty 😔
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10 transition-colors">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
        ❤️ My Wishlist
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <div
            key={item._id}
            onClick={() => handleCardClick(item.bookId)}
            className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg
                       dark:shadow-gray-900/50 overflow-hidden cursor-pointer
                       transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-64">
              <img
                src={item.imageURL}
                alt={item.bookName}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Price */}
              <span className="absolute top-4 left-4 bg-blue-600 dark:bg-blue-500
                               text-white text-sm font-bold px-3 py-1 rounded-xl shadow">
                ₹{item.price}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-[200px]">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">
                  {item.bookName}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  ✍️ {item.author}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.bookId);
                }}
                className="mt-4 py-2 rounded-2xl bg-red-500 dark:bg-red-600
                           text-white font-semibold hover:bg-red-600
                           dark:hover:bg-red-700 transition shadow-md"
              >
                Remove 💔
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

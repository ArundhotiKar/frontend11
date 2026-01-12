import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const BookDetails = () => {
  const { user, role } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const [userHasOrdered, setUserHasOrdered] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);

  /* ================= Fetch Book ================= */
  useEffect(() => {
    axios
      .get(`https://backend11-kappa.vercel.app/books/${id}`)
      .then(res => setBook(res.data))
      .catch(() => setError("Failed to fetch book details"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= Wishlist Check ================= */
  useEffect(() => {
    if (!user) return;
    axios
      .get(
        `https://backend11-kappa.vercel.app/wishlist/id?userEmail=${user.email}&bookId=${id}`
      )
      .then(res => setIsInWishlist(res.data.length > 0))
      .catch(() => {});
  }, [user, id]);

  /* ================= Order Check ================= */
  useEffect(() => {
    if (!user) return;
    axios
      .get(`https://backend11-kappa.vercel.app/my-orders?email=${user.email}`)
      .then(res => {
        const ordered = res.data.some(o => o.bookId === id);
        setUserHasOrdered(ordered);
      });
  }, [user, id]);

  /* ================= Ratings ================= */
  useEffect(() => {
    axios
      .get(`https://backend11-kappa.vercel.app/ratings/${id}`)
      .then(res => {
        setAverageRating(res.data.averageRating);
        if (user) {
          const myRating = res.data.ratings.find(
            r => r.userEmail === user.email
          );
          if (myRating) setUserRating(myRating.rating);
        }
      });
  }, [id, user]);

  /* ================= Wishlist ================= */
  const handleWishlistToggle = async () => {
    if (!user) return toast.error("Please login first");

    try {
      const token = await user.getIdToken();

      if (isInWishlist) {
        await axios.delete(
          `https://backend11-kappa.vercel.app/wishlist/${book._id}?userEmail=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsInWishlist(false);
        toast.success("Removed from wishlist 💔");
      } else {
        await axios.post(
          "https://backend11-kappa.vercel.app/wishlist",
          {
            bookId: book._id,
            bookName: book.name,
            author: book.author,
            price: book.price,
            imageURL: book.imageURL,
            userEmail: user.email,
            createdAt: new Date(),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsInWishlist(true);
        toast.success("Added to wishlist ❤️");
      }
    } catch {
      toast.error("Wishlist action failed");
    }
  };

  /* ================= Rating ================= */
  const handleRatingSubmit = async (star) => {
    if (!user) return toast.error("Please login first");

    await axios.post("https://backend11-kappa.vercel.app/ratings", {
      bookId: book._id,
      userEmail: user.email,
      rating: star,
    });

    setUserRating(star);
    toast.success(`You rated ${star} ⭐`);

    const res = await axios.get(`https://backend11-kappa.vercel.app/ratings/${id}`);
    setAverageRating(res.data.averageRating);
  };

  /* ================= Order ================= */
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    await axios.post("https://backend11-kappa.vercel.app/orders", {
      bookId: book._id,
      bookName: book.name,
      price: parseInt(book.price),
      userName: user.displayName,
      userEmail: user.email,
      librarianEmail: book.librarianEmail,
      phone: form.phone.value,
      address: form.address.value,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    });

    toast.success("Order placed successfully!");
    setModalOpen(false);
    navigate("/dashboard/orders");
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4 flex justify-center">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* IMAGE */}
        <div className="relative h-80 md:h-full">
          <img
            src={book.imageURL}
            alt={book.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-lg font-semibold">
            ₹{book.price}
          </span>
        </div>

        {/* DETAILS */}
        <div className="p-8 text-gray-800 dark:text-white">
          <h2 className="text-4xl font-bold mb-1">{book.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            ✍️ {book.author}
          </p>

          <p className="leading-relaxed text-gray-700 dark:text-gray-300">
            {book.description}
          </p>

          {role === "User" && (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Order Now
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 py-3 rounded-xl font-semibold ${
                  isInWishlist
                    ? "bg-red-600 text-white"
                    : "border border-blue-600 text-blue-600"
                }`}
              >
                {isInWishlist ? "Remove 💔" : "Wishlist ❤️"}
              </button>
            </div>
          )}

          {/* RATING */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-bold mb-2">Rate this Book</h3>

            {userHasOrdered ? (
              <div className="flex gap-2 text-3xl">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} onClick={() => handleRatingSubmit(star)}>
                    <span
                      className={
                        star <= userRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Order this book to give rating
              </p>
            )}

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              ⭐ Average Rating:{" "}
              <span className="font-semibold">
                {averageRating ?? "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Place Order
            </h2>
            <form onSubmit={handleOrderSubmit} className="space-y-3">
              <input readOnly value={user.displayName} className="w-full border p-2 rounded" />
              <input readOnly value={user.email} className="w-full border p-2 rounded" />
              <input name="phone" placeholder="Phone" required className="w-full border p-2 rounded" />
              <textarea name="address" placeholder="Address" required className="w-full border p-2 rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;

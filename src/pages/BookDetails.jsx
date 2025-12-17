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
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/books/${id}`);
                setBook(res.data);
            } catch (err) {
                setError("Failed to fetch book details");
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    /* ================= Wishlist Check ================= */
    useEffect(() => {
        if (!user) return;
        const checkWishlist = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/wishlist/id?userEmail=${user.email}&bookId=${id}`
                );
                setIsInWishlist(res.data.length > 0);
            } catch (err) {
                console.error(err);
            }
        };
        checkWishlist();
    }, [user, id]);

    /* ================= Order Check ================= */
    useEffect(() => {
        if (!user) return;
        const checkOrder = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/my-orders?email=${user.email}`
                );
                const ordered = res.data.some(o => o.bookId === id);
                setUserHasOrdered(ordered);
            } catch (err) {
                console.error(err);
            }
        };
        checkOrder();
    }, [user, id]);

    /* ================= Fetch Ratings ================= */
    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:4000/ratings/${id}`
                );

                setAverageRating(res.data.averageRating);

                if (user) {
                    const myRating = res.data.ratings.find(
                        r => r.userEmail === user.email
                    );
                    if (myRating) {
                        setUserRating(myRating.rating);
                    }
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchRatings();
    }, [id, user]);

    /* ================= Wishlist Toggle ================= */
    const handleWishlistToggle = async () => {
  if (!user) {
    toast.error("Please login first");
    return;
  }

  try {
    // Get Firebase ID token
    const token = await user.getIdToken(); // 🔑 This is the correct token

    if (isInWishlist) {
      await axios.delete(
        `http://localhost:4000/wishlist/${book._id}?userEmail=${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ send the token
        }
      );
      setIsInWishlist(false);
      toast.success("Removed from wishlist 💔");
    } else {
      await axios.post(
        "http://localhost:4000/wishlist",
        {
          bookId: book._id.toString(),
          bookName: book.name,
          author: book.author,
          price: book.price,
          imageURL: book.imageURL,
          userEmail: user.email,
          createdAt: new Date(),
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // ✅ send the token
        }
      );
      setIsInWishlist(true);
      toast.success("Added to wishlist ❤️");
    }
  } catch (err) {
    console.error(err);
    toast.error("Wishlist action failed");
  }
};


    /* ================= Rating Submit ================= */
    const handleRatingSubmit = async (star) => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        try {
            await axios.post("http://localhost:4000/ratings", {
                bookId: book._id,
                userEmail: user.email,
                rating: star,
            });

            setUserRating(star);
            toast.success(`You rated ${star} ⭐`);

            // Refresh average rating
            const res = await axios.get(`http://localhost:4000/ratings/${id}`);
            setAverageRating(res.data.averageRating);
        } catch (err) {
            toast.error("Failed to submit rating");
        }
    };


    /* ================= Order Submit ================= */
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        try {
            await axios.post("http://localhost:4000/orders", {
                bookId: book._id,
                bookName: book.name,
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
        } catch (err) {
            toast.error("Failed to place order");
        }
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
    if (!book) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">

            <div className="max-w-6xl bg-white rounded-3xl shadow-2xl flex md:flex-row flex-col overflow-hidden">

                {/* Image */}
                <div className="md:w-1/2 h-64 relative">
                    <img
                        src={book.imageURL}
                        alt={book.name}
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded">
                        ₹{book.price}
                    </span>
                </div>

                {/* Details */}
                <div className="md:w-1/2 p-6 flex flex-col">

                    <h2 className="text-3xl font-bold">{book.name}</h2>
                    <p className="text-gray-500 mt-1">✍️ {book.author}</p>
                    <p className="mt-3 text-gray-700">{book.description}</p>

                    {role === "User" && (
                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => setModalOpen(true)}
                                className="flex-1 py-2 bg-blue-600 text-white rounded-xl"
                            >
                                Order Now
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                className={`flex-1 py-2 rounded-xl ${isInWishlist
                                    ? "bg-red-600 text-white"
                                    : "border border-blue-600 text-blue-600"
                                    }`}
                            >
                                {isInWishlist ? "Remove 💔" : "Wishlist ❤️"}
                            </button>
                        </div>
                    )}

                    {/* ===== Rating ===== */}
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-bold mb-2">Rate this Book</h3>

                        {userHasOrdered ? (
                            <div className="flex gap-2 text-3xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} onClick={() => handleRatingSubmit(star)}>
                                        <span className={star <= userRating ? "text-yellow-400" : "text-gray-300"}>
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

                        <p className="mt-2 text-sm text-gray-600">
                            ⭐ Average Rating:{" "}
                            <span className="font-semibold">
                                {averageRating ?? "N/A"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== Order Modal ===== */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">Place Order</h2>
                        <form onSubmit={handleOrderSubmit} className="space-y-3">
                            <input readOnly value={user.displayName} className="w-full border p-2" />
                            <input readOnly value={user.email} className="w-full border p-2" />
                            <input name="phone" placeholder="Phone" required className="w-full border p-2" />
                            <textarea name="address" placeholder="Address" required className="w-full border p-2" />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
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

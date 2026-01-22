import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://backend11-kappa.vercel.app/my-books?email=${user.email}`)
      .then((res) => setBooks(res.data));
  }, [user]);

  const toggleStatus = async (id, status) => {
    const newStatus = status === "published" ? "unpublished" : "published";

    await axios.patch(`https://backend11-kappa.vercel.app/books/${id}`, {
      status: newStatus,
    });

    setBooks((prev) =>
      prev.map((book) =>
        book._id === id ? { ...book, status: newStatus } : book
      )
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-400">
        📚 My Books
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="text-gray-800 dark:text-gray-200">
              <th className="border p-3">Image</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {books.map((book) => (
              <tr key={book._id} className="bg-white dark:bg-gray-800 border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="border p-3">
                  <img src={book.imageURL} className="w-16 h-20 mx-auto object-cover rounded" alt={book.name} />
                </td>

                <td className="border p-3 font-semibold text-gray-800 dark:text-gray-200">
                  {book.name}
                </td>

                <td className="border p-3">
                  <span
                    className={`px-3 py-1 rounded text-white text-sm ${
                      book.status === "published" ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>

                <td className="border p-3 space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}
                    className="px-4 py-1 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(book._id, book.status)}
                    className="px-4 py-1 bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600 text-white rounded transition"
                  >
                    {book.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooks;

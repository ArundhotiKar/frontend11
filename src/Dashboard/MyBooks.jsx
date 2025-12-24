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
      .then(res => setBooks(res.data));
  }, [user]);

  const toggleStatus = async (id, status) => {
    const newStatus = status === "published" ? "unpublished" : "published";

    await axios.patch(`https://backend11-kappa.vercel.app/books/${id}`, {
      status: newStatus,
    });

    setBooks(prev =>
      prev.map(book =>
        book._id === id ? { ...book, status: newStatus } : book
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📚 My Books</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book._id} className="text-center">
              <td className="border p-2">
                <img src={book.imageURL} className="w-16 mx-auto" />
              </td>

              <td className="border p-2 font-semibold">{book.name}</td>

              <td className="border p-2">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    book.status === "published"
                      ? "bg-green-600"
                      : "bg-gray-500"
                  }`}
                >
                  {book.status}
                </span>
              </td>

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => toggleStatus(book._id, book.status)}
                  className="px-3 py-1 bg-orange-600 text-white rounded"
                >
                  {book.status === "published" ? "Unpublish" : "Publish"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;

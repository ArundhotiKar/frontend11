import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/books");
      setBooks(res.data);
      setLoading(false);
    } catch {
      toast.error("Failed to load books");
    }
  };

  const togglePublish = async (book) => {
    try {
      const newStatus = book.status === "published" ? "unpublished" : "published";
      await axios.patch(`http://localhost:4000/books/${book._id}`, { status: newStatus });
      toast.success(book.status === "published" ? "Book unpublished" : "Book published");
      setBooks((prev) =>
        prev.map((b) =>
          b._id === book._id ? { ...b, status: newStatus } : b
        )
      );
    } catch {
      toast.error("Action failed");
    }
  };

  const deleteBook = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book and all related orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:4000/books/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Book and related orders deleted",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading books...</p>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Books</h1>

      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No books found</p>
      )}

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">Cover</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Librarian</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img
                    src={book.imageURL}
                    alt={book.name}
                    className="w-16 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{book.name}</td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3 text-gray-600">{book.librarianEmail}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      book.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.status === "published" ? "Published" : "Unpublished"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <button
                      onClick={() => togglePublish(book)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition ${
                        book.status === "published"
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {book.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => deleteBook(book._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-xs font-medium"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;

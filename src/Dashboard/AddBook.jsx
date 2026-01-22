import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const author = form.author.value;
    const price = form.price.value;
    const status = form.status.value;
    const imageFile = form.image.files[0];
    const description = form.description.value;
    const librarianEmail = user?.email;

    if (!imageFile) {
      alert("Please upload a book image");
      setLoading(false);
      return;
    }

    try {
      // Upload image to IMGBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(
        "https://api.imgbb.com/1/upload?key=59eb7243643090e0bb38e5290a4b29e4",
        formData
      );

      if (!res.data.success) throw new Error("Image upload failed");

      const imageURL = res.data.data.url;

      // Book object
      const bookData = {
        name,
        author,
        price,
        status,
        image: imageURL,
        description,
        librarianEmail,
      };

      await axios.post("https://backend11-kappa.vercel.app/books", bookData);

      toast.success("📘 Book added successfully!", { theme: "colored" });
      navigate("/dashboard/my-books");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book ❌", { theme: "colored" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-900 dark:text-blue-400">
          📘 Add New Book
        </h2>

        <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Name */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">Book Name</label>
            <input
              name="name"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Author */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">Author</label>
            <input
              name="author"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Price */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">Price</label>
            <input
              type="number"
              name="price"
              required
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-300">Status</label>
            <select
              name="status"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Book Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="font-semibold text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              name="description"
              rows="4"
              className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition"
          >
            {loading ? "Uploading..." : "➕ Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

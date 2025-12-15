import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
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
            // 🔹 Upload image to IMGBB (same as Register)
            const formData = new FormData();
            formData.append("image", imageFile);

            const res = await axios.post(
                "https://api.imgbb.com/1/upload?key=59eb7243643090e0bb38e5290a4b29e4",
                formData
            );

            if (!res.data.success) throw new Error("Image upload failed");

            const imageURL = res.data.data.url;
            //console.log(imageURL);

            // 🔹 Book object
            const bookData = {
                name,
                author,
                price,
                status,
                image: imageURL,
                description
            };

            // 🔹 Send to backend
            await axios.post("http://localhost:4000/books", { name, author, price, status, imageURL, description, librarianEmail });

            toast.success("📘 Book added successfully!");
            navigate("/dashboard/my-books");

            form.reset();

        } catch (error) {
            console.error(error);
            alert("Failed to add book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">📘 Add New Book</h2>

                <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Book Name */}
                    <div>
                        <label className="font-semibold">Book Name</label>
                        <input name="name" required className="w-full border p-3 rounded" />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="font-semibold">Author</label>
                        <input name="author" required className="w-full border p-3 rounded" />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="font-semibold">Price</label>
                        <input type="number" name="price" required className="w-full border p-3 rounded" />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="font-semibold">Status</label>
                        <select name="status" className="w-full border p-3 rounded">
                            <option value="published">Published</option>
                            <option value="unpublished">Unpublished</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Book Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full border p-3 rounded"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full border p-3 rounded"
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700"
                    >
                        {loading ? "Uploading..." : "➕ Add Book"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddBook;

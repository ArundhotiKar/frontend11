import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({
        name: "",
        author: "",
        price: "",
        imageURL: "",
        description: "",
        status: "published",
    });

    // 📌 Fetch book by id
    useEffect(() => {
        axios
            .get(`https://backend11-kappa.vercel.app/books/${id}`)
            .then(res => {
                setBook(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    // 🔄 Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    // 💾 Update book
    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.patch(`https://backend11-kappa.vercel.app/books/edit/${id}`, book);
        toast("Book updated successfully!");
        navigate("/dashboard/my-books");
    };

    if (loading) {
        return <p className="text-center mt-10">Loading book...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-6">✏️ Edit Book</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-semibold mb-1">Book Name</label>
                    <input
                        type="text"
                        name="name"
                        value={book.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Image URL</label>
                    <input
                        type="text"
                        name="imageURL"
                        value={book.imageURL}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Status</label>
                    <select
                        name="status"
                        value={book.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                    </select>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBook;

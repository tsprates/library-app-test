import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createBook, updateBook, fetchAuthors } from "../services/api";

export default function BookForm({ bookToEdit, onSave }) {
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const authorData = await fetchAuthors();
                setAuthors(authorData.data);
            } catch (err) {
                setError("Failed to load authors. Please try again.");
                console.error(err);
            }
        };

        loadAuthors();

        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthorId(bookToEdit.authors[0]?.id || "");
        } else {
            setTitle("");
            setAuthorId("");
        }
    }, [bookToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const bookData = { title, author: authorId };

        try {
            if (bookToEdit) {
                await updateBook(bookToEdit.id, bookData);
            } else {
                await createBook(bookData);
            }
            onSave();
        } catch (err) {
            setError("An error occurred while saving the book. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg"
        >
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Title:</label>
                <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Author:</label>
                <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    required
                >
                    <option value="">Select an author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
                type="submit"
                className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 ${loading && "opacity-50 cursor-not-allowed"
                    }`}
                disabled={loading}
            >
                {loading ? "Saving..." : bookToEdit ? "Update Book" : "Add Book"}
            </button>
        </form>
    );
}

// Define PropTypes
BookForm.propTypes = {
    bookToEdit: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        authors: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
    }),
    onSave: PropTypes.func.isRequired,
};

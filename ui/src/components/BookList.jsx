import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchBooks, deleteBook } from '../services/api';

export default function BookList({ onEdit }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data.data);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      setError('Failed to delete the book. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading books...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className="border p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-500">
                  Authors: {book.authors.map((author) => author.name).join(', ')}
                </p>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

BookList.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

import { useState } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [bookToEdit, setBookToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (book) => {
    setBookToEdit(book);
  };

  const handleSave = () => {
    setBookToEdit(null);
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Books Management
        </h1>
        <BookForm bookToEdit={bookToEdit} onSave={handleSave} />
        <BookList key={refresh} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;

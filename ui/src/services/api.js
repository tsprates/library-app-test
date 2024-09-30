const API_BASE_URL = 'http://localhost:3333';

export async function fetchBooks() {
  const response = await fetch(`${API_BASE_URL}/books`);
  return response.json();
}

export async function fetchBook(id) {
  const response = await fetch(`${API_BASE_URL}/books/${id}`);
  return response.json();
}

export async function createBook(bookData) {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  return response.json();
}

export async function updateBook(id, bookData) {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  return response.json();
}

export async function deleteBook(id) {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}

export async function fetchAuthors() {
  const response = await fetch(`${API_BASE_URL}/authors`);
  return response.json();
}

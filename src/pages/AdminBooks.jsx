import { useEffect, useState } from "react";

import api from "../services/api";

function AdminBooks() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    imageUrl: "",
    price: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);

  // FETCH BOOKS

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await api.get("/books");

      console.log(response.data);

      // SAFE RESPONSE HANDLING

      const booksData =
        response.data?.data?.content || response.data?.data || [];

      setBooks(booksData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE BOOK

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/books/${editingId}`,

          formData,
        );

        alert("Book Updated Successfully");
      } else {
        await api.post(
          "/books",

          formData,
        );

        alert("Book Added Successfully");
      }

      // RESET FORM

      setFormData({
        title: "",
        author: "",
        category: "",
        imageUrl: "",
        price: "",
        stock: "",
      });

      setEditingId(null);

      fetchBooks();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  // DELETE BOOK

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm("Delete this book?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/books/${id}`);

      alert("Book Deleted");

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT BOOK

  const editBook = (book) => {
    setEditingId(book.id);

    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      imageUrl: book.imageUrl,
      price: book.price,
      stock: book.stock,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  return (
    <div className="page-container admin-page">
      <h1 className="page-title">Manage Books</h1>

      {/* FORM */}

      <div className="admin-book-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <button className="submit-btn">
            {editingId ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>

      {/* LOADING */}

      {loading ? (
        <h2
          style={{
            marginTop: "40px",
          }}
        >
          Loading Books...
        </h2>
      ) : (
        <>
          {books.length > 0 ? (
            <div className="admin-books-grid">
              {books.map((book) => (
                <div key={book.id} className="admin-book-card">
                  <img
                    src={book.imageUrl || "https://via.placeholder.com/250x320"}
                    alt={book.title}
                  />

                  <div className="admin-book-info">
                    <h2>{book.title}</h2>

                    <p>{book.author}</p>

                    <span className="category-badge">{book.category}</span>

                    <h3 className="book-price">₹{book.price}</h3>

                    <p className="book-stock">Stock: {book.stock}</p>
                  </div>

                  <div className="admin-book-actions">
                    <button className="edit-btn" onClick={() => editBook(book)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="No Books"
              />

              <h2>No Books Found</h2>

              <p>Add books from admin panel</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminBooks;

import { useEffect, useState } from "react";

import api from "../services/api";

import BookCard from "../components/BookCard";

function Books() {

    const [books, setBooks] =
        useState([]);

    // FETCH BOOKS
    const fetchBooks = async () => {

        try {

            const response =
                await api.get("/books");

            console.log(response.data);

            // SAFE RESPONSE HANDLING
            setBooks(
                response.data?.data?.content || []
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchBooks();

    }, []);

    return (

        <div className="page-container">

           <div className="page-container">

    <h1 className="page-title">
        Books
    </h1>

    <div className="books-grid">

        {

            books.length > 0 ? (

                books.map((book) => (

                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))

            ) : (

                <p>No books available</p>
            )
        }

    </div>

</div>
        </div>
    );
}

export default Books;
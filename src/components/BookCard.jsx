import api from "../services/api";

function BookCard({ book }) {

    // ADD TO CART
    const addToCart = async () => {

        try {

            await api.post(
                `/cart/add/${book.id}`
            );

            alert("Book Added To Cart");

        } catch (error) {

            console.log(error);

            alert("Failed To Add Cart");
        }
    };

    return (

        <div className="book-card">

            {/* IMAGE SECTION */}

            <div className="book-image-container">

                <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="book-image"
                />

            </div>

            {/* DETAILS */}

            <div className="book-details">

                <span className="category">
                    {book.category}
                </span>

                <h2 className="book-title">
                    {book.title}
                </h2>

                <p className="author">
                    by {book.author}
                </p>

                <div className="price-row">

                    <div>

                        <h3 className="price">
                            ₹{book.price}
                        </h3>

                        <p className="stock">
                            Stock: {book.stock}
                        </p>

                    </div>

                    <button
                        className="cart-btn"
                        onClick={addToCart}
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BookCard;
import { useEffect, useState } from "react";

import api from "../services/api";

function Cart() {

    const [cart, setCart] =
        useState(null);

    // FETCH CART
    const fetchCart = async () => {

        try {

            const response =
                await api.get("/cart");

            console.log(response.data);

            setCart(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    // REMOVE ITEM
    const removeItem = async (id) => {

        try {

            await api.delete(
                `/cart/remove/${id}`
            );

            fetchCart();

        } catch (error) {

            console.log(error);
        }
    };

    // PLACE ORDER
    const placeOrder = async () => {

        try {

            await api.post(
                "/orders/place"
            );

            alert(
                "Order Placed Successfully"
            );

            fetchCart();

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchCart();

    }, []);

    return (

        <div className="page-container">

            <h1 className="page-title">

                My Cart

            </h1>

            {

                cart?.items?.length > 0 ? (

                    <>

                        {

                            cart.items.map((item) => (

                                <div
                                    key={item.cartItemId}
                                    className="cart-card"
                                >

                                    {/* BOOK IMAGE */}

                                    <div className="cart-image-section">

                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="cart-book-image"
                                        />

                                    </div>

                                    {/* BOOK DETAILS */}

                                    <div className="cart-details">

                                        <div className="cart-top">

                                            <h2>
                                                {item.title}
                                            </h2>

                                            <span className="cart-quantity">

                                                Qty:
                                                {" "}
                                                {item.quantity}

                                            </span>

                                        </div>

                                        <p className="cart-price">

                                            ₹{item.price}

                                        </p>

                                        <p className="cart-total">

                                            Total:
                                            {" "}
                                            ₹{item.totalPrice}

                                        </p>

                                        <button
                                            className="remove-btn"
                                            onClick={() =>
                                                removeItem(
                                                    item.cartItemId
                                                )
                                            }
                                        >

                                            Remove

                                        </button>

                                    </div>

                                </div>
                            ))
                        }

                        {/* SUMMARY */}

                        <div className="cart-summary">

                            <h2>

                                Grand Total:
                                {" "}
                                ₹{cart.grandTotal}

                            </h2>

                            <button
                                className="submit-btn"
                                onClick={placeOrder}
                            >

                                Place Order

                            </button>

                        </div>

                    </>

                ) : (

                    <div className="empty-cart">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="Empty Cart"
                        />

                        <h2>

                            Your Cart is Empty

                        </h2>

                        <p>

                            Add books to continue shopping

                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default Cart;
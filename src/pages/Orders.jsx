import { useEffect, useState } from "react";

import api from "../services/api";

function Orders() {

    const [orders, setOrders] =
        useState([]);

    // FETCH ORDERS
    const fetchOrders = async () => {

        try {

            const response =
                await api.get(
                    "/orders/my-orders"
                );

            console.log(response.data);

            setOrders(
                response.data.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    return (

        <div className="page-container">

            <h1 className="page-title">

                My Orders

            </h1>

            {

                orders.length > 0 ? (

                    orders.map((order) => (

                        <div
                            key={order.orderId}
                            className="order-card"
                        >

                            {/* TOP SECTION */}

                            <div className="order-top">

                                <h2 className="order-id">

                                    Order #{order.orderId}

                                </h2>

                                <span
                                    className={`order-status ${order.status.toLowerCase()}`}
                                >

                                    {order.status}

                                </span>

                            </div>

                            {/* ORDER DETAILS */}

                            <div className="order-details">

                                <p>

                                    📅 Ordered On:
                                    {" "}
                                    {
                                        new Date(
                                            order.orderDate
                                        ).toLocaleString()
                                    }

                                </p>

                                <p>

                                    💳 Payment:
                                    {" "}
                                    Cash On Delivery

                                </p>

                                <p>

                                    🚚 Delivery:
                                    {" "}
                                    Expected in 2 Days

                                </p>

                            </div>

                            {/* TOTAL */}

                            <h3 className="order-total">

                                ₹{order.totalAmount}

                            </h3>

                        </div>
                    ))

                ) : (

                    <div className="empty-cart">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No Orders"
                        />

                        <h2>

                            No Orders Yet

                        </h2>

                        <p>

                            Your placed orders will appear here

                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default Orders;
import { useEffect, useState } from "react";

import api from "../services/api";

function AdminOrders() {

    const [orders, setOrders] =
        useState([]);

    // FETCH ALL ORDERS

    const fetchOrders = async () => {

        try {

            const response =
                await api.get(
                    "/admin/orders"
                );

            console.log(response.data);

            setOrders(
                response.data.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    // UPDATE STATUS

    const updateStatus = async (

        orderId,

        status

    ) => {

        try {

            await api.put(

                `/admin/orders/${orderId}/status`,

                { status }
            );

            fetchOrders();

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

                Manage Orders

            </h1>

            {

                orders.length > 0 ? (

                    orders.map((order) => (

                        <div
                            key={order.orderId}
                            className="admin-order-card"
                        >

                            {/* TOP */}

                            <div className="admin-order-top">

                                <div>

                                    <h2>

                                        Order #
                                        {order.orderId}

                                    </h2>

                                    <p>

                                        Customer:
                                        {" "}
                                        {order.customerName}

                                    </p>

                                    <p>

                                        Email:
                                        {" "}
                                        {order.customerEmail}

                                    </p>

                                </div>

                                <div
                                    className={`admin-status ${order.status.toLowerCase()}`}
                                >

                                    {order.status}

                                </div>

                            </div>

                            {/* DETAILS */}

                            <div className="admin-order-details">

                                <p>

                                    Amount:
                                    {" "}
                                    ₹{order.totalAmount}

                                </p>

                                <p>

                                    Date:
                                    {" "}
                                    {

                                        new Date(
                                            order.orderDate
                                        ).toLocaleString()
                                    }

                                </p>

                            </div>

                            {/* ACTIONS */}

                            <div className="admin-actions">

                                {

                                    order.status === "PENDING" && (

                                        <>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order.orderId,
                                                        "CONFIRMED"
                                                    )
                                                }
                                                className="confirm-btn"
                                            >

                                                Confirm

                                            </button>

                                            <button
                                                onClick={() =>
                                                    updateStatus(
                                                        order.orderId,
                                                        "CANCELLED"
                                                    )
                                                }
                                                className="cancel-btn"
                                            >

                                                Cancel

                                            </button>

                                        </>
                                    )
                                }

                                {

                                    order.status === "CONFIRMED" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.orderId,
                                                    "SHIPPED"
                                                )
                                            }
                                            className="ship-btn"
                                        >

                                            Ship

                                        </button>
                                    )
                                }

                                {

                                    order.status === "SHIPPED" && (

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.orderId,
                                                    "DELIVERED"
                                                )
                                            }
                                            className="deliver-btn"
                                        >

                                            Deliver

                                        </button>
                                    )
                                }

                            </div>

                        </div>
                    ))

                ) : (

                    <p>

                        No Orders Found

                    </p>
                )
            }

        </div>
    );
}

export default AdminOrders;
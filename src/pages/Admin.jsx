import { useEffect, useState } from "react";

import api from "../services/api";

function Admin() {

    const [analytics, setAnalytics] =
        useState(null);

    const [mostSoldBooks, setMostSoldBooks] =
        useState([]);

    // FETCH ANALYTICS

    const fetchAnalytics = async () => {

        try {

            const response =
                await api.get(
                    "/admin/analytics"
                );

            console.log(response.data);

            setAnalytics(
                response.data.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    // FETCH MOST SOLD BOOKS

    const fetchMostSoldBooks = async () => {

        try {

            const response =
                await api.get(
                    "/admin/most-sold-books"
                );

            console.log(response.data);

            setMostSoldBooks(
                response.data.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchAnalytics();

        fetchMostSoldBooks();

    }, []);

    return (

        <div className="page-container">

            <h1 className="page-title">

                Admin Dashboard

            </h1>

            {/* ANALYTICS CARDS */}

            {

                analytics && (

                    <div className="analytics-grid">

                        <div className="analytics-card">

                            <h3>
                                Total Revenue
                            </h3>

                            <h2>
                                ₹{analytics.totalRevenue}
                            </h2>

                        </div>

                        <div className="analytics-card">

                            <h3>
                                Total Orders
                            </h3>

                            <h2>
                                {analytics.totalOrders}
                            </h2>

                        </div>

                        <div className="analytics-card">

                            <h3>
                                Total Users
                            </h3>

                            <h2>
                                {analytics.totalUsers}
                            </h2>

                        </div>

                        <div className="analytics-card">

                            <h3>
                                Low Stock Books
                            </h3>

                            <h2>
                                {analytics.lowStockBooks}
                            </h2>

                        </div>

                    </div>
                )
            }

            {/* MOST SOLD BOOKS */}

            <div className="most-sold-section">

                <h2 className="section-title">

                    Most Sold Books

                </h2>

                {

                    mostSoldBooks.length > 0 ? (

                        mostSoldBooks.map((book, index) => (

                            <div
                                key={index}
                                className="sold-book-card"
                            >

                                <div>

                                    <h3>
                                        {book.title}
                                    </h3>

                                </div>

                                <span className="sold-badge">

                                    {book.totalSold} Sold

                                </span>

                            </div>
                        ))

                    ) : (

                        <p>
                            No Sales Data Available
                        </p>
                    )
                }

            </div>

        </div>
    );
}

export default Admin;
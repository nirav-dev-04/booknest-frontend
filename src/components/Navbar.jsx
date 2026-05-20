import { Link, useNavigate } from "react-router-dom";

import {
    FaBook,
    FaShoppingCart,
    FaClipboardList,
    FaUserShield,
    FaSignInAlt,
    FaUserPlus,
    FaBars,
    FaSignOutAlt,
    FaChartLine,
    FaBoxOpen
} from "react-icons/fa";

import { useState } from "react";

function Navbar() {

    const [collapsed, setCollapsed] =
        useState(false);

    const navigate = useNavigate();

    // TOKEN

    const token =
        localStorage.getItem("token");

    // ROLE

    const role =
        localStorage.getItem("role");

    // LOGOUT

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        navigate("/login");
    };

    return (

        <div className="layout">

            <div className={

                collapsed

                    ? "sidebar collapsed"

                    : "sidebar"
            }>

                {/* TOP */}

                <div className="sidebar-top">

                    {

                        !collapsed && (

                            <h2 className="logo">

                                BookCart

                            </h2>
                        )
                    }

                    <button
                        className="menu-btn"
                        onClick={() =>
                            setCollapsed(!collapsed)
                        }
                    >

                        <FaBars />

                    </button>

                </div>

                {/* LINKS */}

                <div className="sidebar-links">

                    {/* PUBLIC */}

                    <Link to="/">

                        <FaBook />

                        {

                            !collapsed &&
                            <span>Books</span>
                        }

                    </Link>

                    {/* NOT LOGGED IN */}

                    {

                        !token && (

                            <>

                                <Link to="/login">

                                    <FaSignInAlt />

                                    {

                                        !collapsed &&
                                        <span>Login</span>
                                    }

                                </Link>

                                <Link to="/register">

                                    <FaUserPlus />

                                    {

                                        !collapsed &&
                                        <span>Register</span>
                                    }

                                </Link>

                            </>
                        )
                    }

                    {/* USER SIDEBAR */}

                    {

                        token && role === "USER" && (

                            <>

                                <Link to="/cart">

                                    <FaShoppingCart />

                                    {

                                        !collapsed &&
                                        <span>Cart</span>
                                    }

                                </Link>

                                <Link to="/orders">

                                    <FaClipboardList />

                                    {

                                        !collapsed &&
                                        <span>Orders</span>
                                    }

                                </Link>

                            </>
                        )
                    }

                    {/* ADMIN SIDEBAR */}

                    {

                        token && role === "ADMIN" && (

                            <>

                                <Link to="/admin">

                                    <FaUserShield />

                                    {

                                        !collapsed &&
                                        <span>Dashboard</span>
                                    }

                                </Link>

                                <Link to="/admin/books">

                                    <FaBook />

                                    {

                                        !collapsed &&
                                        <span>Manage Books</span>
                                    }

                                </Link>

                                <Link to="/admin/orders">

                                    <FaBoxOpen />

                                    {

                                        !collapsed &&
                                        <span>Manage Orders</span>
                                    }

                                </Link>

                                <Link to="/admin/analytics">

                                    <FaChartLine />

                                    {

                                        !collapsed &&
                                        <span>Analytics</span>
                                    }

                                </Link>

                            </>
                        )
                    }

                    {/* LOGOUT */}

                    {

                        token && (

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >

                                <FaSignOutAlt />

                                {

                                    !collapsed &&
                                    <span>Logout</span>
                                }

                            </button>
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default Navbar;
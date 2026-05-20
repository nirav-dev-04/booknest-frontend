import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({

            email: "",

            password: ""
        });

    const [error, setError] =
        useState("");

    // HANDLE INPUT

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    // HANDLE LOGIN

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response =
                await api.post(

                    "/auth/login",

                    formData
                );

            console.log(response.data);

            // STORE TOKEN

            localStorage.setItem(

                "token",

                response.data.data.token
            );

            // STORE ROLE

            localStorage.setItem(

                "role",

                response.data.data.role
            );

            // REDIRECT BASED ON ROLE

            if (

                response.data.data.role
                === "ADMIN"

            ) {

                navigate("/admin");

            } else {

                navigate("/");
            }

        } catch (error) {

            setError(

                error.response?.data?.message
                || "Login Failed"
            );
        }
    };

    return (

        <div className="page-container auth-page">

            <div className="form-container">

                <div className="auth-header">

                    <h1 className="form-title">

                        Welcome Back
                    </h1>

                    <p className="auth-subtitle">

                        Login to continue
                    </p>

                </div>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input

                            type="email"

                            name="email"

                            placeholder="Enter email"

                            value={formData.email}

                            onChange={handleChange}

                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input

                            type="password"

                            name="password"

                            placeholder="Enter password"

                            value={formData.password}

                            onChange={handleChange}

                            required
                        />

                    </div>

                    {

                        error && (

                            <p className="error-text">

                                {error}
                            </p>
                        )
                    }

                    <button
                        className="submit-btn"
                    >

                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;
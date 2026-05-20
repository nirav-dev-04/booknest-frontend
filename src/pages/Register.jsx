import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({

            name: "",

            email: "",

            password: "",

            confirmPassword: ""
        });

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    // HANDLE INPUT
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    // HANDLE REGISTER
    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");

        // PASSWORD MATCH VALIDATION
        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match"
            );

            return;
        }

        // PASSWORD LENGTH
        if (
            formData.password.length < 6
        ) {

            setError(
                "Password must be at least 6 characters"
            );

            return;
        }

        try {

            const response =
                await api.post(

                    "/auth/register",

                    {

                        name:
                            formData.name,

                        email:
                            formData.email,

                        password:
                            formData.password
                    }
                );

            setSuccess(
                response.data.message
            );

            // REDIRECT TO LOGIN
            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            setError(

                error.response?.data?.message
                || "Registration Failed"
            );
        }
    };

    return (

        <div className="page-container auth-page">

            <div className="form-container">

                <div className="auth-header">

                    <h1 className="form-title">

                        Create Account
                    </h1>

                    <p className="auth-subtitle">

                        Register to continue
                    </p>

                </div>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input

                            type="text"

                            name="name"

                            placeholder="Enter name"

                            value={formData.name}

                            onChange={handleChange}

                            required
                        />

                    </div>

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

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input

                            type="password"

                            name="confirmPassword"

                            placeholder="Confirm password"

                            value={
                                formData.confirmPassword
                            }

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

                    {

                        success && (

                            <p className="success-text">

                                {success}
                            </p>
                        )
                    }

                    <button
                        className="submit-btn"
                    >

                        Register
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;
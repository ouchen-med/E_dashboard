import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!terms) {
            toast.error('You must agree to the Terms & Conditions')
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token); // 🔥 حفظ JWT
                toast.success(data.message, {
                    className: "custom-toast-success",
                });
                setName('');
                setEmail('');
                setPassword('');
                setTerms(false);
                navigate("/products");
            } else {
                toast.error(data.error)
            }

        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join our community today</p>
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-check">
                        <input
                            type="checkbox"
                            id="terms"
                            className="form-check-input"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                        <label htmlFor="terms" className="form-check-label">
                            I agree to the Terms & Conditions
                        </label>
                    </div>

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>

                    <div className="signup-footer">
                        <p>
                            Already have an account?
                            <Link to="/login" className="login-link"> Log In</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

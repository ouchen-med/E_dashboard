import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        if (!terms) {
            alert('You must agree to the Terms & Conditions');
            return;
        }

        console.log('Form Data:', { name, email, password, terms });

        setName('');
        setEmail('');
        setPassword('');
        setTerms(false);

        alert('Account created successfully!');
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

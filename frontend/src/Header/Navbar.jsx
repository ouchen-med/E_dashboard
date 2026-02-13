import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
export default function Navbar({ user, setUser }) {


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">E-Dashboard</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!user && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/regester">Sign Up</Link></li>
                            </>
                        )}

                        {user && user.role === 'USER' && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                            </>
                        )}

                        {user && user.role === 'ADMIN' && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/add-product">Add Product</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/update-product">Update Product</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

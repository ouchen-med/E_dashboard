import React from 'react';
import './Logout.css';
import { Link } from 'react-router-dom';

export default function Logout() {
    return (
        <div className="logout-container">
            <div className="card shadow-lg logout-card">
                <div className="card-body text-center p-5">
                    <div className="logout-icon mb-4">
                        <i className="fas fa-sign-out-alt fa-3x"></i>
                    </div>

                    <h2 className="mb-4">Logout</h2>

                    <p className="text-muted mb-4">
                        Are you sure you want to log out?
                    </p>

                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-primary btn-lg px-4">
                            <i className="fas fa-check me-2"></i>
                            Confirm Logout
                        </button>

                        <Link to="/" className="btn btn-outline-secondary btn-lg px-4">
                            <i className="fas fa-times me-2"></i>
                            Cancel
                        </Link>
                    </div>

                    <div className="mt-5 text-muted">
                        <small>
                            You will be redirected to the login page
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
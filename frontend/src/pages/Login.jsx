import './Login.css';
import { Link } from 'react-router-dom';

export default function SignUp() {




    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create Account</h2>
                    <p>Join our community today</p>
                </div>

                <form className="signup-form" >
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="form-control"

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            className="form-control"

                        />
                    </div>

                    <button type="submit" className="signup-btn">
                        Login
                    </button>

                    <div className="signup-footer">
                        <p>
                            Already have an account?
                            <Link to="/regester" className="login-link">SignUp</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

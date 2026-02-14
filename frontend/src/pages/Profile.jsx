import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch('http://localhost:4000/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setUserData(data);
        };

        fetchProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    if (!userData) return (
        <div className="loading">
            Loading...
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-image-wrapper">
                        <img
                            src={image || `https://ui-avatars.com/api/?name=${userData.name}&background=4361ee&color=fff&size=120`}
                            alt="profile"
                            className="profile-image"
                        />
                        <label className="upload-btn">
                            Change photo
                            <input type="file" hidden onChange={handleImageChange} />
                        </label>
                    </div>

                    <div className="profile-info">
                        <h2>{userData.name}</h2>
                        <p className="email">{userData.email}</p>
                        <span className={`role-badge ${userData.role?.toLowerCase()}`}>
                            {userData.role?.toLowerCase() === 'admin' ? ' Admin' : '👤 User'}
                        </span>
                    </div>
                </div>

                <div className="welcome-section">
                    <div className="welcome-header">
                        <h3>
                            Welcome back, {userData.name}!
                            <span className="wave-emoji"></span>
                        </h3>
                        <p className="welcome-subtitle">
                            {userData.role?.toLowerCase() === 'admin'
                                ? 'Here\'s your admin overview'
                                : 'Here\'s your personal dashboard'}
                        </p>
                    </div>

                    <div className={`role-card ${userData.role?.toLowerCase()}`}>
                        <div className="role-card-header">
                            <span className="role-icon">
                                {userData.role?.toLowerCase() === 'admin' ? '₪' : '₪'}
                            </span>
                            <span className="role-title">
                                {userData.role?.toLowerCase() === 'admin'
                                    ? 'Administrator Access'
                                    : 'Standard User Access'}
                            </span>
                        </div>

                        <p className="role-description">
                            {userData.role?.toLowerCase() === 'admin'
                                ? 'You have full access to manage the platform.'
                                : 'Welcome to your personal space!'}
                        </p>

                        <div className="capabilities">
                            {userData.role?.toLowerCase() === 'admin' ? (
                                <>
                                    <span className="capability">✓ Manage Users</span>
                                    <span className="capability">✓ View Analytics</span>
                                    <span className="capability">✓ System Config</span>
                                    <span className="capability">✓ Content Moderation</span>
                                </>
                            ) : (
                                <>
                                    <span className="capability">✓ Create Posts</span>
                                    <span className="capability">✓ Edit Profile</span>
                                    <span className="capability">✓ Follow Others</span>
                                    <span className="capability">✓ Save Content</span>
                                </>
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
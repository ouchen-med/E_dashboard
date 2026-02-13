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

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="profile-header">
                    <div className="profile-image-wrapper">
                        <img
                            src={image || "https://via.placeholder.com/150"}
                            alt="profile"
                            className="profile-image"
                        />
                        <label className="upload-btn">
                            Change Photo
                            <input type="file" hidden onChange={handleImageChange} />
                        </label>
                    </div>

                    <div className="profile-info">
                        <h2>{userData.name}</h2>
                        <p className="email">{userData.email}</p>
                        <span className="role-badge">{userData.role}</span>
                    </div>
                </div>

                <div className="profile-stats">
                    <div>
                        <h4>120</h4>
                        <span>Posts</span>
                    </div>
                    <div>
                        <h4>350</h4>
                        <span>Followers</span>
                    </div>
                    <div>
                        <h4>180</h4>
                        <span>Following</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

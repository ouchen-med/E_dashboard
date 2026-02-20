import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddProduct.css'; // Create this CSS file

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        stock: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error('Please select an image');
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('discount', formData.discount);
        data.append('stock', formData.stock);
        data.append('image', image);

        try {
            const res = await axios.post('http://localhost:4000/products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success("Product added successfully!");
            setFormData({ name: '', description: '', price: '', discount: '', stock: '' });
            setImage(null);
            setPreview(null);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="add-product-container">
            <div className="add-product-card">
                <div className="card-header">
                    <h2>Add New Product</h2>
                    <p className="subtitle">Fill in the details to add a new product to your inventory</p>
                </div>

                {message && <div className="alert-message">{message}</div>}

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label className="form-label">
                            <span className="label-text">Product Name</span>
                            <span className="required-star">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-input"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <span className="label-text">Description</span>
                            <span className="required-star">*</span>
                        </label>
                        <textarea
                            name="description"
                            className="form-input"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe your product..."
                            required
                        ></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-text">Price ($)</span>
                                <span className="required-star">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="form-input"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-text">Discount (%)</span>
                            </label>
                            <input
                                type="number"
                                name="discount"
                                className="form-input"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                max="100"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-text">Stock</span>
                                <span className="required-star">*</span>
                            </label>
                            <input
                                type="number"
                                name="stock"
                                className="form-input"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Quantity"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <span className="label-text">Product Image</span>
                            <span className="required-star">*</span>
                        </label>
                        <div className="file-input-container">
                            <input
                                type="file"
                                className="file-input"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageChange}
                                id="product-image"
                                required={!image}
                            />
                            <label htmlFor="product-image" className="file-input-label">
                                <svg className="upload-icon" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                                </svg>
                                <span>Choose an image</span>
                            </label>
                        </div>
                        <p className="file-hint">Supported formats: JPG, JPEG, PNG, WEBP</p>
                    </div>

                    {preview && (
                        <div className="preview-container">
                            <label className="preview-label">Preview:</label>
                            <div className="preview-wrapper">
                                <img src={preview} alt="Preview" className="preview-image" />
                                <button
                                    type="button"
                                    className="remove-image"
                                    onClick={() => {
                                        setImage(null);
                                        setPreview(null);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    <button type="submit" className="submit-button">
                        <span>Add Product</span>
                        <svg className="button-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}
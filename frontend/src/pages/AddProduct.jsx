import React, { useState } from 'react';
import axios from 'axios';

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
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setMessage('⚠️ Please select an image');
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
            setMessage('✅ Product added successfully!');
            setFormData({ name: '', description: '', price: '', discount: '', stock: '' });
            setImage(null);
            setPreview(null);
        } catch (error) {
            setMessage('❌ Error: ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body">
                    <h3 className="card-title mb-4">Add New Product</h3>

                    {message && <div className="alert alert-info">{message}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Discount</label>
                                <input
                                    type="number"
                                    name="discount"
                                    className="form-control"
                                    value={formData.discount}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageChange}
                                required
                            />
                        </div>

                        {preview && (
                            <div className="mb-3">
                                <label className="form-label">Preview:</label>
                                <img src={preview} alt="Preview" className="img-fluid rounded" />
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-100">
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
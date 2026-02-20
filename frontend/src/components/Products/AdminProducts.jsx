import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./AdminProducts.css"; // Import custom CSS
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import Swal from "sweetalert2";





export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingStartTime = useRef(Date.now()); // Track when loading started

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Fetch products from API
            const res = await axios.get("http://localhost:4000/products");
            setProducts(res.data.data);

            const elapsedTime = Date.now() - loadingStartTime.current;
            const remainingTime = Math.max(0, 2000 - elapsedTime); // 3 seconds minimum

            if (remainingTime > 0) {
                setTimeout(() => {
                    setLoading(false);
                }, remainingTime);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            // Still wait for minimum 3 seconds even on error
            const elapsedTime = Date.now() - loadingStartTime.current;
            const remainingTime = Math.max(0, 2000 - elapsedTime);

            setTimeout(() => {
                setLoading(false);
            }, remainingTime);
        }
    };



    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("token");

                    const res = await axios.delete(
                        `http://localhost:4000/products/${id}`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    );

                    if (res.data.success) {
                        setProducts(prev =>
                            prev.filter(product => product._id !== id)
                        );

                        toast.success("Product deleted successfully ");

                        Swal.fire(
                            "Deleted!",
                            "Your product has been deleted.",
                            "success"
                        );
                    } else {
                        toast.error(res.data.message || "Failed to delete product ");
                    }

                } catch (error) {
                    console.error("Error deleting product:", error);
                    toast.error("Error deleting product ");
                }
            }

        });
    };
    if (loading) return <Loading></Loading>;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2>Products Management</h2>
                <Link to="/add-product" className="btn-add">
                    + Add New Product
                </Link>

            </div>

            <div className="table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td className="product-image">
                                    <img
                                        src={`http://localhost:4000/${product.image}`}
                                        alt={product.name}
                                    />
                                </td>
                                <td className="product-name">
                                    <div>{product.name}</div>
                                    <small>{product.description?.substring(0, 30)}...</small>
                                </td>
                                <td className="product-price">${product.price}</td>
                                <td>
                                    <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="product-actions">
                                    <button className="btn-edit" title="Edit">
                                        <CiEdit />
                                    </button>
                                    <button
                                        className="btn-delete"
                                        title="Delete"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <MdDelete />

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {products.length === 0 && (
                <div className="empty-state">
                    <p>No products found</p>
                    <Link to="/add-product" className="btn-add">Add Your First Product</Link>
                </div>
            )}
        </div>
    );
}
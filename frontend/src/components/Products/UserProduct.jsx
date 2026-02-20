import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsLoading from "../Loading/CardsLoading";
import './UserProduct.css'

export default function UserProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Create a timer promise that resolves after 3 seconds
                const timerPromise = new Promise(resolve => setTimeout(resolve, 3000));

                // Fetch products from API
                const productsPromise = axios.get("http://localhost:4000/products");

                // Wait for both the API call AND at least 3 seconds
                const [res] = await Promise.all([productsPromise, timerPromise]);

                setProducts(res.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                // Still wait for 3 seconds even on error
                await new Promise(resolve => setTimeout(resolve, 3000));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <CardsLoading></CardsLoading>;

    return (
        <div className="container mt-5">
            <div className="row g-4">
                {products.map((product) => (
                    <div className="col-lg-4 col-md-6" key={product._id}>
                        <div className="custom-card">
                            <div className="image-wrapper">
                                <img
                                    src={`http://localhost:4000/${product.image}`}
                                    alt={product.name}
                                />
                            </div>

                            <div className="card-content">
                                <h5>{product.name}</h5>
                                <p>{product.description}</p>
                                <div className="card-footer">
                                    <span className="price">${product.price}</span>
                                    <button className="btn btn-dark btn-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardsLoading from "../Loading/CardsLoading";
import './UserProduct.css'
import { AiFillProduct } from "react-icons/ai";


export default function UserProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const timerPromise = new Promise(resolve => setTimeout(resolve, 3000));

                const productsPromise = axios.get("http://localhost:4000/products");

                const [res] = await Promise.all([productsPromise, timerPromise]);

                setProducts(res.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                await new Promise(resolve => setTimeout(resolve, 2000));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <CardsLoading></CardsLoading>;
    if (products.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-info shadow-sm">
                    <h4>No Products Available <AiFillProduct /></h4>
                    <p className="mb-0">
                        There are currently no products in the store.
                    </p>
                </div>
            </div>
        );
    }

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
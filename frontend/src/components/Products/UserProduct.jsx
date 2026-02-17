import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import CardsLoading from "../Loading/CardsLoading";

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
        <div className="container mt-4">
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card shadow-sm">
                            <img
                                src={`http://localhost:4000/${product.image}`}
                                alt={product.name}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5>{product.name}</h5>
                                <p>{product.description}</p>
                                <h6>${product.price}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
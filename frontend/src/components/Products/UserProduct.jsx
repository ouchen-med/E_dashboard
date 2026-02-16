import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:4000/products");
                setProducts(res.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <h3>Loading...</h3>;

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

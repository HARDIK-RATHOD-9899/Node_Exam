import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [Product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5110/allProducts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching Product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!Product) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="container mt-5">
        {/* Product Content */}
        <div className="card mb-5 shadow">
          <img
            src={Product.image}
            className="card-img-top"
            alt={Product.title}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h1 className="card-title text-center">{Product.title}</h1>
            <p className="card-text text-center text-muted">
              <small>
                Published on {Product.date} | Category:{" "}
                <span className="text-primary">{Product.category}</span>
              </small>
            </p>
            <p className="lead">{Product.description}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleProduct;
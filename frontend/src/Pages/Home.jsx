import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
  const [Products, setProducts] = useState([]);

  const handleLike = async (ProductId) => {
    try {
      const response = await fetch(`http://localhost:5010/${ProductId}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: sessionStorage.getItem("UserId") }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.msg);
        return;
      }

      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((Product) =>
          Product._id === updatedProduct._id ? updatedProduct : Product
        )
      );
    } catch (error) {
      console.error("Error liking the Product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5110/allProducts");
        if (!response.ok) {
          throw new Error("Failed to fetch Products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching Products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />

      <div className="container my-5">
        

        <div className="row">
          {Products.map((Product) => (
            <div key={Product._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <Link to={`/allProducts/${Product._id}`}>
                  <img src={Product.image} className="card-img-top" alt={Product.title} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{Product.title}</h5>
                  <p className="card-text text-truncate">{Product.description}</p>
                  <p className="text-muted">{Product.category}</p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
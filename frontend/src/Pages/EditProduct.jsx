import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProduct = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5110/editget/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Product data.");
        }

        const data = await response.json();
        setFormData(data.Product);
      } catch (error) {
        console.error("Error fetching Product data:", error);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5110/editProduct`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, ...formData }),
      });

      if (response.ok) {
        toast.success("Product updated successfully!");
        setTimeout(() => navigate("/"), 3000);
      } else {
        const result = await response.json();
        toast.error(result.message || "Failed to update Product.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the Product.");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      <section className="container my-5">
        <h2 className="text-center mb-4">Edit Your Product</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {/* Product Title */}
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Product Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your Product title"
              required
            />
          </div>

          {/* Product Description */}
          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter your Product description"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Family">Family</option>
              <option value="Management">Management</option>
              <option value="Travel">Travel</option>
              <option value="Work">Work</option>
            </select>
          </div>

          {/* Image Link */}
          <div className="col-md-6">
            <label htmlFor="image" className="form-label">
              Image Link
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter the image URL"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary btn-lg">
              Update Product
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default EditProduct;
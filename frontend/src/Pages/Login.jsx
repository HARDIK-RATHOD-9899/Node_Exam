import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import 'animate.css'; // Import animate.css

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg);
        const token = result.token;

        sessionStorage.setItem("token", token);

        const decoded = jwtDecode(token); 

        if (decoded.role === 'admin') {
          setTimeout(() => {
            navigate('/admin');
          }, 3000);
        } else {
          setTimeout(() => {
            navigate('/products');
          }, 3000);
        }
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while logging in.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-25 m-auto d-flex justify-content-center align-items-center vh-100">
        <div className="card w-100 w-md-50 animate__animated animate__fadeIn">
          <div className="card-body">
            <h3 className="animate__animated animate__fadeIn card-title text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  className="form-control animate__animated animate__fadeIn"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control animate__animated animate__fadeIn"
                  id="password"
                  required
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary animate__animated animate__fadeIn">Login</button>
              </div>
            </form>
            <p className="mt-3 text-center animate__animated animate__fadeIn">
              Don't have an Account? <Link to="/signup" className="text-primary">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

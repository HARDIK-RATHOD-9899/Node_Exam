import React, { useState } from 'react';
import Icon from "@mdi/react";
import { mdiFacebook, mdiGooglePlus } from "@mdi/js";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css'; // Import animate.css

const Signup = () => {
  const [role, setRole] = useState('');
  const [adminInput, setAdminInput] = useState('');
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    role: "",
    adminCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    if (name === 'role') {
      setRole(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const secretKey = role === 'admin' ? adminInput : undefined;

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while registering.');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-25 m-auto d-flex justify-content-center align-items-center min-vh-100">
        <div className="card w-100 w-md-50 animate__animated animate__fadeIn">
          <div className="card-body">
            <h3 className="text-center mb-4 animate__animated animate__fadeIn">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control animate__animated animate__fadeIn"
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control animate__animated animate__fadeIn"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control animate__animated animate__fadeIn"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select animate__animated animate__fadeIn"
                  name="role"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {role === 'admin' && (
                <div className="mb-3">
                  <label className="form-label">Admin Code</label>
                  <input
                    type="text"
                    className="form-control animate__animated animate__fadeIn"
                    name="adminCode"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 animate__animated animate__fadeIn">Register</button>
            </form>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-primary w-48 animate__animated animate__fadeIn">
                <Icon path={mdiFacebook} size={1} className="me-2" />
                Facebook
              </button>
              <button className="btn btn-danger w-48 animate__animated animate__fadeIn">
                <Icon path={mdiGooglePlus} size={1} className="me-2" />
                Google Plus
              </button>
            </div>

            <p className="text-center text-sm text-muted mt-3 animate__animated animate__fadeIn">
              Already have an account?{' '}
              <Link to="/" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

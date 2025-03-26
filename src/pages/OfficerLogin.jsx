import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OfficerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    badgeNumber: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const newError = {};
    if (!formData.badgeNumber) newError.badgeNumber = "Badge Number is required";
    if (!formData.password) newError.password = "Password is required";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        // Call the login API
        const response = await axios.post("http://localhost:5000/api/officers/login", formData);

        if (response.data.token) {
          // Save the token to local storage or context
          localStorage.setItem("token", response.data.token);
          navigate("/officer-dashboard"); // Redirect to officer dashboard
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          setLoginError(error.response.data.error);
        } else {
          setLoginError("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Officer Login</h2>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="badgeNumber" className="form-label">Badge Number:</label>
            <input
              type="text"
              id="badgeNumber"
              name="badgeNumber"
              className={`form-control ${error.badgeNumber ? "is-invalid" : ""}`}
              value={formData.badgeNumber}
              onChange={handleInputChange}
            />
            {error.badgeNumber && <div className="invalid-feedback">{error.badgeNumber}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={handleInputChange}
            />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfficerLogin;

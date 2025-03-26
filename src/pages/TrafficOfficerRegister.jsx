import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const TrafficOfficerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    badgeNumber: "",
  });
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });

    try {
      const response = await axios.post("http://localhost:5000/api/officers/register", formData);

      if (response.status === 201) {
        setFeedback({ message: "Registration successful!", type: "success" });
        setFormData({ name: "", email: "", password: "", badgeNumber: "" }); // Clear the form
        setTimeout(() => {
          navigate("/admin-users"); // Redirect to /admin-users after 1.2 seconds
        }, 1200);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
      setFeedback({ message: errorMessage, type: "danger" });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-lg">
            <h2 className="text-center mb-4">Traffic Officer Registration</h2>

            {feedback.message && (
              <div className={`alert alert-${feedback.type}`}>{feedback.message}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="badgeNumber" className="form-label">Badge Number</label>
                <input
                  type="text"
                  id="badgeNumber"
                  name="badgeNumber"
                  className="form-control"
                  value={formData.badgeNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficOfficerRegister;
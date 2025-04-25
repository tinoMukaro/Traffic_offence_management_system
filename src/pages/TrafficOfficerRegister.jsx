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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Traffic Officer Registration
          </h2>

          {feedback.message && (
            <div
              className={`p-3 rounded-md mb-4 ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="badgeNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Badge Number
              </label>
              <input
                type="text"
                id="badgeNumber"
                name="badgeNumber"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={formData.badgeNumber}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TrafficOfficerRegister;

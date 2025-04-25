import { useState } from "react";
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

    const newError = {};
    if (!formData.badgeNumber) newError.badgeNumber = "Badge Number is required";
    if (!formData.password) newError.password = "Password is required";

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/officers/login", formData);

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/officer-dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Officer Login</h2>

        {loginError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="badgeNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Badge Number:
            </label>
            <input
              type="text"
              id="badgeNumber"
              name="badgeNumber"
              className={`w-full border ${
                error.badgeNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
              value={formData.badgeNumber}
              onChange={handleInputChange}
            />
            {error.badgeNumber && (
              <p className="text-red-500 text-xs mt-1">{error.badgeNumber}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full border ${
                error.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600`}
              value={formData.password}
              onChange={handleInputChange}
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficerLogin;

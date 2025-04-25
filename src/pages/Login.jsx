import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div
        className={`bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center transform transition duration-700 ${
          animate ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-2">
          Welcome to Traffic Offence Manager
        </h2>
        <p className="text-gray-500 mb-6">Please select your role to continue</p>

        <div className="space-y-4">
          <Link
            to="/admin-login"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-2 rounded-lg transition-transform hover:-translate-y-1"
          >
            🛂 Admin Login
          </Link>
          <Link
            to="/officer-login"
            className="flex items-center justify-center gap-2 w-full border border-gray-400 hover:border-gray-600 text-gray-700 hover:text-gray-900 text-lg font-medium py-2 rounded-lg transition-transform hover:-translate-y-1"
          >
            👮 Traffic Officer Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

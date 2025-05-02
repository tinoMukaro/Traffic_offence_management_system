import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

      <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-md border border-gray-200 bg-white text-black hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        {/* Dashboard Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">Welcome, Admin</h2>
          <p className="mt-2 text-gray-600 text-lg">
            Manage users, offenses, penalties, and more.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Manage Users */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-blue-400">
            <div className="text-3xl mb-2">👥</div>
            <h5 className="text-xl font-semibold text-blue-700 mb-1">Manage Users</h5>
            <p className="text-gray-700 mb-4 text-sm">Oversee system users and permissions.</p>
            <Link
              to="/admin-users"
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-blue-700 transition duration-200"
            >
              Go to Users
            </Link>
          </div>

          {/* View Offenses */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-yellow-300">
            <div className="text-3xl mb-2">📄</div>
            <h5 className="text-xl font-semibold text-yellow-700 mb-1">View Offenses</h5>
            <p className="text-gray-700 mb-4 text-sm">Check and manage traffic offenses.</p>
            <Link
              to="/view-offenses"
              className="bg-yellow-500 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-yellow-600 transition duration-200"
            >
              View Now
            </Link>
          </div>

          {/* Update Offenses */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-green-400">
            <div className="text-3xl mb-2">🛠️</div>
            <h5 className="text-xl font-semibold text-green-700 mb-1">Update Offenses</h5>
            <p className="text-gray-700 mb-4 text-sm">Adjust fines and penalty points.</p>
            <Link
              to="/update-offense"
              className="bg-green-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-green-700 transition duration-200"
            >
              Update Now
            </Link>
          </div>

          {/* cron job */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-red-400">
            <div className="text-3xl mb-2">🚪</div>
            <h5 className="text-xl font-semibold text-red-700 mb-1">Penalty Points</h5>
            <p className="text-gray-700 mb-4 text-sm">View Penalty Points Reduced</p>
            <Link
              to="/penalty-points"
              className="bg-red-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-red-700 transition duration-200"
            >
              View Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


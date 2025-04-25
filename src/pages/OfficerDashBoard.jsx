import { useNavigate } from "react-router-dom";

const TrafficOfficerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 drop-shadow-md">
        👮‍♂️ Welcome, Officer
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Card 1 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-blue-400">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Log an Offense</h3>
          <p className="text-gray-700 mb-4 text-sm">Record a traffic offense in the system.</p>
          <button
            onClick={() => navigate("/log-offense")}
            className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-blue-700 transition duration-200"
          >
            Log Offense
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-yellow-300">
          <h3 className="text-xl font-semibold text-yellow-700 mb-2">View Logged Offenses</h3>
          <p className="text-gray-700 mb-4 text-sm">Check and manage logged offenses.</p>
          <button
            onClick={() => navigate("/view-offenses")}
            className="bg-yellow-500 text-white px-5 py-2 rounded-full font-medium shadow hover:bg-yellow-600 transition duration-200"
          >
            View Offenses
          </button>
        </div>
      </div>

      {/* Log Out Button */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300"
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  );
};

export default TrafficOfficerDashboard;

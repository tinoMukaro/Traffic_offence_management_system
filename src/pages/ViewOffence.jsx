import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewOffenses = () => {
  const [offenses, setOffenses] = useState([]);
  const [selectedOffense, setSelectedOffense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/offenders/offenses/all");
        setOffenses(response.data.data || []);
      } catch {
        setError("Failed to fetch offenses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffenses();
  }, []);

  const handleViewDetails = (offense) => {
    setSelectedOffense(offense);
    setShowModal(true);
  };

  const handleClearFine = async (offenseId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/offenders/offenses/${offenseId}/update-fine-status`,
        { newStatus: "Paid" }
      );

      if (response.data.success) {
        setOffenses((prev) =>
          prev.map((offense) =>
            offense.id === offenseId ? { ...offense, fine_status: "Paid" } : offense
          )
        );
        alert("Fine status updated to Paid.");
      } else {
        alert("Failed to update fine status.");
      }
    } catch {
      alert("Failed to update fine status. Please try again.");
    }
  };

  const handleViewOffenders = () => {
    navigate("/offenders");
  };

  if (loading) return <div className="p-4">Loading offenses...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">View Offenses</h2>
        <button
          onClick={handleViewOffenders}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View Offenders
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">License Plate</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Offender Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Offense Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date & Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Penalty Points</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Fine Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {offenses.length > 0 ? (
              offenses.map((offense) => (
                <tr key={offense.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{offense.license_plate}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{offense.offender_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{offense.offense_type}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {new Date(offense.offense_datetime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">{offense.penalty_points}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">${offense.fine_amount}</td>
                  <td className="px-4 py-2 text-sm">
                    <span
                      className={`font-semibold ${
                        offense.fine_status === "Unpaid"
                          ? "text-red-600"
                          : offense.fine_status === "Paid"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {offense.fine_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleViewDetails(offense)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      View Details
                    </button>
                    {offense.fine_status === "Pending" && (
                      <button
                        onClick={() => handleClearFine(offense.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Clear
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No offenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedOffense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Offense Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Offender Name:</strong> {selectedOffense.offender_name}</p>
              <p><strong>License Plate:</strong> {selectedOffense.license_plate}</p>
              <p><strong>Offense Type:</strong> {selectedOffense.offense_type}</p>
              <p><strong>Date & Time:</strong> {new Date(selectedOffense.offense_datetime).toLocaleString()}</p>
              <p><strong>Penalty Points:</strong> {selectedOffense.penalty_points}</p>
              <p><strong>Fine Amount:</strong> ${selectedOffense.fine_amount}</p>
              <p><strong>Status:</strong> {selectedOffense.fine_status}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOffenses;

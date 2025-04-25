import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageTrafficOfficers = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/officers/");
        setOfficers(response.data);
      } catch (error) {
        console.error("Error fetching officers:", error);
      }
    };

    fetchOfficers();
  }, []);

  const filteredOfficers = officers.filter((officer) =>
    officer.name.toLowerCase().includes(search.toLowerCase()) ||
    officer.badge_number.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedOfficer) {
      try {
        await axios.delete(`http://localhost:5000/api/officers/${selectedOfficer.id}`);
        setShowDelete(false);
        const response = await axios.get("http://localhost:5000/api/officers/");
        setOfficers(response.data);
      } catch (error) {
        console.error("Error deleting officer:", error);
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">👮‍♂️ Manage Traffic Officers</h2>
          <button
            onClick={() => navigate('/officer-register')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add Officer
          </button>
        </div>

        <input
          type="text"
          placeholder="Search officers..."
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Badge Number</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOfficers.map((officer) => (
                <tr key={officer.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{officer.badge_number}</td>
                  <td className="border px-4 py-2">{officer.name}</td>
                  <td className="border px-4 py-2">{officer.email}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        officer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {officer.status || "Active"}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedOfficer(officer);
                        setShowDelete(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOfficers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No matching officers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Delete Officer</h3>
            <p className="mb-6">Are you sure you want to delete this officer?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDelete(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ManageTrafficOfficers };

import React, { useState, useEffect } from "react";

const Offender = () => {
  const [offenders, setOffenders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/offenders/offenders/all")
      .then((res) => res.json())
      .then((data) => {
        setOffenders(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching offenders:", err);
        setLoading(false);
      });
  }, []);

  const filteredOffenders = offenders.filter((offender) =>
    offender.offender_name.toLowerCase().includes(search.toLowerCase()) ||
    offender.license_number.includes(search)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Traffic Offenders List</h2>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or license number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-75"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full text-sm text-center text-gray-700">
            <thead className="bg-gray-800 text-white text-sm uppercase">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">License No.</th>
                <th className="px-4 py-2">License Plate</th>
                <th className="px-4 py-2">Vehicle Model</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Total Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffenders.length > 0 ? (
                filteredOffenders.map((offender, index) => (
                  <tr
                    key={offender.license_number}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{offender.offender_name}</td>
                    <td className="px-4 py-2">{offender.license_number}</td>
                    <td className="px-4 py-2">{offender.license_plate}</td>
                    <td className="px-4 py-2">{offender.vehicle_model}</td>
                    <td className="px-4 py-2">{offender.phone_number}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        offender.total_points >= 20 ? "text-red-600" : ""
                      }`}
                    >
                      {offender.total_points}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No offenders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Offender;

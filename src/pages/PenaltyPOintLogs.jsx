import { useEffect, useState } from 'react';

export default function OffenderLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://192.168.88.28:5000/api/offender-logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Offender Logs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-200 text-xs uppercase font-medium text-gray-700">
              <tr>
                <th className="px-6 py-3">Log ID</th>
                <th className="px-6 py-3">License Number</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Details</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                    No logs available.
                  </td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr
                    key={log.log_id}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4">{log.log_id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {log.license_number}
                    </td>
                    <td className="px-6 py-4">{log.action}</td>
                    <td className="px-6 py-4">{log.details}</td>
                    <td className="px-6 py-4">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

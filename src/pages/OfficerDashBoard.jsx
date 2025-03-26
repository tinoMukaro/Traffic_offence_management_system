import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TrafficOfficerDashboard = () => {
  const navigate = useNavigate();
  const [recentOffenses, setRecentOffenses] = useState([]);
  const [stats, setStats] = useState({ topOffense: "N/A" });

  useEffect(() => {
    // Fetch recent offenses (dummy data for now)
    setRecentOffenses([
      { id: 1, type: "Speeding", date: "2025-03-05" },
      { id: 2, type: "Running Red Light", date: "2025-03-05" },
      { id: 3, type: "Illegal Parking", date: "2025-03-04" },
    ]);

    // Fetch stats (dummy data for now)
    setStats({ topOffense: "Speeding" });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">WELCOME</h2>
    
      
      {/* Stats Widget */}
      <div className="row d-flex justify-content-center gap-3">
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">Most Common Offense</h5>
              <p className="card-text display-6">{stats.topOffense}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Existing Functionality */}
      <div className="row d-flex justify-content-center gap-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">Log an Offense</h5>
              <p className="card-text">Record a traffic offense in the system.</p>
              <button onClick={() => navigate("/log-offense")} className="btn btn-light">Log an Offense</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">View Logged Offenses</h5>
              <p className="card-text">Check and manage logged offenses.</p>
              <button onClick={() => navigate("/view-offenses")} className="btn btn-light">View Logged Offenses</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Offenses Summary */}
      <div className="card mt-4 p-3">
        <h5 className="text-center">Recent Offenses</h5>
        <ul className="list-group">
          {recentOffenses.map((offense) => (
            <li key={offense.id} className="list-group-item">
              {offense.type} - {offense.date}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Logout Button */}
      <div className="text-center mt-4">
        <button
          className="btn text-white fw-bold py-3"
          style={{ backgroundColor: "#dc3545" }}
          onClick={() => navigate("/")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default TrafficOfficerDashboard;

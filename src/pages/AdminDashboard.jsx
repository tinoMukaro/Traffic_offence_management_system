import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">WELCOME</h2>
      <div className="row d-flex justify-content-center gap-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">Oversee system users and permissions.</p>
              <Link to="/admin-users" className="btn btn-light">Manage Users</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-white bg-warning mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">View Offenses</h5>
              <p className="card-text">Check and manage traffic offenses.</p>
              <Link to="/view-offenses" className="btn btn-light">View Offenses</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-white bg-success mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">Update Offenses</h5>
              <p className="card-text">Update fine amounts and Penalty points</p>
              <Link to="/update-offense" className="btn btn-light">Update offenses</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card text-white bg-danger mb-3 text-center">
            <div className="card-body">
              <h5 className="card-title">Log Out</h5>
              <p className="card-text">Exit the admin dashboard.</p>
              <Link to="/" className="btn btn-light">Log Out</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Officer from "./pages/Officer";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import OfficerLogin from "./pages/OfficerLogin";
import AdminDashboard from "./pages/AdminDashboard";
import TrafficOfficerDashboard from "./pages/OfficerDashBoard";
import OffenceLogin from "./pages/OffenceLogin"
import { fetchData } from "./api";
import AdminRegister from "./pages/AdminRegister";
import TrafficOfficerRegister from "./pages/TrafficOfficerRegister";
import ViewOffenses from "./pages/ViewOffence";
import { ManageTrafficOfficers } from "./pages/ManageTrafficOfficers";
import Offender from "./pages/offenders";
import UpdateOffense from "./pages/UpdateOffense";


const App = () => {
  

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/officer" element={<Officer />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/officer-login" element={<OfficerLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/officer-dashboard" element={<TrafficOfficerDashboard />} />
          <Route path="/log-offense" element={<OffenceLogin />} />
          <Route path="/admin-register" element={< AdminRegister />} />
          <Route path="/officer-register" element={< TrafficOfficerRegister />} />
          <Route path="/view-offenses" element={< ViewOffenses />} />
          <Route path="/admin-users" element={< ManageTrafficOfficers />} />
          <Route path="/offenders" element={< Offender />} />
          <Route path="/update-offense" element={< UpdateOffense />} />
          

        </Routes>
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./componets/NavBar";
import Footer from "./componets/Footer";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import OfficerLogin from "./pages/OfficerLogin";
import TrafficOfficerDashboard from "./pages/OfficerDashBoard";
import AdminRegister from "./pages/AdminRegister";
import { ManageTrafficOfficers } from "./pages/ManageTrafficOfficers";
import ViewOffenses from "./pages/ViewOffence";
import UpdateOffense from "./pages/UpdateOffense";
import Offender from "./pages/Offenders";
import OffenceLogin from "./pages/OffenceLogin";
import TrafficOfficerRegister from "./pages/TrafficOfficerRegister";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import PenaltyPointsLogs from "./pages/PenaltyPOintLogs";



const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/officer-login" element={<OfficerLogin />} />
        <Route path="/officer-dashboard" element={<TrafficOfficerDashboard />} />
        <Route path="/admin-register" element={< AdminRegister />} />
        <Route path="/admin-users" element={< ManageTrafficOfficers />} />
        <Route path="/view-offenses" element={< ViewOffenses />} />
        <Route path="/update-offense" element={< UpdateOffense />} />
        <Route path="/offenders" element={< Offender />} />
        <Route path="/log-offense" element={<OffenceLogin />} /> 
        <Route path="/officer-register" element={< TrafficOfficerRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/penalty-points" element={<PenaltyPointsLogs />} />
        

        
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;

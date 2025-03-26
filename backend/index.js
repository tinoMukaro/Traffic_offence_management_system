const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Admin = require("./models/admin");
const TrafficOfficer = require("./models/trafficOfficer");

const adminRoutes = require("./routes/adminRoutes");
const trafficOfficerRoutes = require("./routes/trafficOfficerRoutes");
const offenseRoutes = require("./routes/offenseRoutes");
const offendersRoutes = require("./routes/offendersRoutes");
const startPenaltyPointsCron = require("./config/cronJobs");



const app = express();

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true, 
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/admins", adminRoutes);
app.use("/api/officers", trafficOfficerRoutes);
app.use("/api/offenses", offenseRoutes);
app.use("/api/offenders", offendersRoutes);

app.get("/", (req, res) => {
    res.send("TOMS Backend Running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  startPenaltyPointsCron();
  console.log("Penalty points cron job started.");
});
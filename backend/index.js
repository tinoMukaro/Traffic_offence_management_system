const express = require("express");
const cors = require("cors");
require("dotenv").config();


const adminRoutes = require("./routes/adminRoutes");
const trafficOfficerRoutes = require("./routes/trafficOfficerRoutes");
const offenseRoutes = require("./routes/offenseRoutes");
const offendersRoutes = require("./routes/offendersRoutes");
const { startPenaltyPointsCron } = require("./config/cronJobs");
const { executePenaltyPointsJob } = require("./config/cronJobs");
const offenderLogsRoutes = require('./routes/offenderLogsRoutes');




const app = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true); // Allow all origins
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

//Routes
app.use("/api/admins", adminRoutes);
app.use("/api/officers", trafficOfficerRoutes);
app.use("/api/offenses", offenseRoutes);
app.use("/api/offenders", offendersRoutes);
app.use('/api', offenderLogsRoutes);




app.get("/api/test-cron", async (req, res) => {
  try {
    const result = await executePenaltyPointsJob(); // Direct execution
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);

  startPenaltyPointsCron();
  console.log("Penalty points cron job started.");
});

const TrafficOfficer = require("../models/trafficOfficer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new traffic officer
const registerOfficer = async (req, res) => {
  const { name, email, password, badgeNumber } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newOfficer = await TrafficOfficer.addOfficer(name, email, hashedPassword, badgeNumber);
    res.status(201).json({ message: "Traffic officer registered successfully", officer: newOfficer });
  } catch (error) {
    res.status(500).json({ error: "Error registering officer" });
  }
};

// Login Officer
const loginOfficer = async (req, res) => {
  const { badgeNumber, password } = req.body;
  try {
    const officer = await TrafficOfficer.getOfficerByBadgeNumber(badgeNumber);
    if (!officer) {
      return res.status(404).json({ error: "Officer not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, officer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: officer.id, badgeNumber: officer.badge_number },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Get officer by email
const getOfficer = async (req, res) => {
  const { email } = req.params;
  try {
    const officer = await TrafficOfficer.getOfficerByEmail(email);
    if (!officer) {
      return res.status(404).json({ error: "Officer not found" });
    }
    res.json(officer);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving officer" });
  }
};

//  Get all traffic officers
const getAllOfficers = async (req, res) => {
  try {
    const officers = await TrafficOfficer.getAllOfficers();
    res.json(officers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all traffic officers" });
  }
};

//  Update a traffic officer
const updateOfficer = async (req, res) => {
  const { id } = req.params;
  const { name, email, badgeNumber } = req.body;
  try {
    const updatedOfficer = await TrafficOfficer.updateOfficer(id, name, email, badgeNumber);
    if (!updatedOfficer) {
      return res.status(404).json({ error: "Officer not found" });
    }
    res.json({ message: "Officer updated successfully", officer: updatedOfficer });
  } catch (error) {
    res.status(500).json({ error: "Error updating officer" });
  }
};

//  Delete a traffic officer
const deleteOfficer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOfficer = await TrafficOfficer.deleteOfficer(id);
    if (!deletedOfficer) {
      return res.status(404).json({ error: "Officer not found" });
    }
    res.json({ message: "Officer deleted successfully", officer: deletedOfficer });
  } catch (error) {
    res.status(500).json({ error: "Error deleting officer" });
  }
};

module.exports = {
  registerOfficer,
  loginOfficer,
  getOfficer,
  getAllOfficers, 
  updateOfficer,  
  deleteOfficer,  
};
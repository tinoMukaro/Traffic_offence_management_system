const express = require("express");
const {
  registerOfficer,
  loginOfficer,
  getOfficer,
  getAllOfficers, 
  updateOfficer,  
  deleteOfficer,   
} = require("../controllers/trafficOfficerController");

const router = express.Router();

// Register a new traffic officer
router.post("/register", registerOfficer);

// Login a traffic officer
router.post("/login", loginOfficer);

// Get a traffic officer by email
router.get("/:email", getOfficer);

//  Get all traffic officers
router.get("/", getAllOfficers);

//  Update a traffic officer by ID
router.put("/:id", updateOfficer);

//  Delete a traffic officer by ID
router.delete("/:id", deleteOfficer);

module.exports = router;
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
require("dotenv").config(); // Load environment variables

// Register a new admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.addAdmin(name, email, hashedPassword);
        res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ error: "Error registering admin" });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.getAdminByEmail(email);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token using environment secret
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};

module.exports = { registerAdmin, loginAdmin };

const pool = require("../config/db");

const TrafficOfficer = {
    // Create Table
    createTable: async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS traffic_officers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                badge_number VARCHAR(50) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await pool.query(query);
            console.log("Traffic officers table created");
        } catch (error) {
            console.error("Error creating traffic officers table:", error);
            throw error;
        }
    },

    // Add a new officer
    addOfficer: async (name, email, password, badge_number) => {
        const query = `
            INSERT INTO traffic_officers (name, email, password, badge_number) 
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        try {
            const result = await pool.query(query, [name, email, password, badge_number]);
            return result.rows[0];
        } catch (error) {
            console.error("Error adding traffic officer:", error);
            throw error;
        }
    },

    // Get officer by email
    getOfficerByEmail: async (email) => {
        const query = "SELECT * FROM traffic_officers WHERE email = $1;";
        try {
            const result = await pool.query(query, [email]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching traffic officer by email:", error);
            throw error;
        }
    },

    // Get officer by badge number (For Login)
    getOfficerByBadgeNumber: async (badgeNumber) => {
        const query = "SELECT * FROM traffic_officers WHERE badge_number = $1;";
        try {
            const result = await pool.query(query, [badgeNumber]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching traffic officer by badge number:", error);
            throw error;
        }
    },

    //  Get all traffic officers
    getAllOfficers: async () => {
        const query = "SELECT * FROM traffic_officers;";
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error fetching all traffic officers:", error);
            throw error;
        }
    },

    //  Update an officer by ID
    updateOfficer: async (id, name, email, badge_number) => {
        const query = `
            UPDATE traffic_officers 
            SET name = $1, email = $2, badge_number = $3 
            WHERE id = $4 RETURNING *;
        `;
        try {
            const result = await pool.query(query, [name, email, badge_number, id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error updating traffic officer:", error);
            throw error;
        }
    },

    // Delete an officer by ID
    deleteOfficer: async (id) => {
        const query = "DELETE FROM traffic_officers WHERE id = $1 RETURNING *;";
        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error("Error deleting traffic officer:", error);
            throw error;
        }
    }
};

module.exports = TrafficOfficer;
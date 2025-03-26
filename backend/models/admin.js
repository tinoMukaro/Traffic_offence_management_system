const pool = require("../config/db");

const Admin = {
    createTable: async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS admins (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        try {
            await pool.query(query);
            console.log("Admins table created");
        } catch (error) {
            console.error("Error creating admins table:", error);
        }
    },

    addAdmin: async (name, email, password) => {
        const query = `
            INSERT INTO admins (name, email, password) 
            VALUES ($1, $2, $3) RETURNING *;
        `;
        try {
            const result = await pool.query(query, [name, email, password]);
            return result.rows[0];
        } catch (error) {
            console.error("Error adding admin:", error);
        }
    },

    getAdminByEmail: async (email) => {
        const query = "SELECT * FROM admins WHERE email = $1;";
        try {
            const result = await pool.query(query, [email]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching admin:", error);
        }
    }
};

module.exports = Admin;

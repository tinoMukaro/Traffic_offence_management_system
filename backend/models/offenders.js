const pool = require("../config/db");

const Offender = {
    addOffender: async (offenderData) => {
        const query = `
            INSERT INTO offenders (
                offender_name,
                license_number,
                license_plate,
                vehicle_model,
                phone_number,
                total_points
            ) VALUES (
                $1, $2, $3, $4, $5, $6
            ) ON CONFLICT (license_number) DO UPDATE
            SET
                offender_name = EXCLUDED.offender_name,
                license_plate = EXCLUDED.license_plate,
                vehicle_model = EXCLUDED.vehicle_model,
                phone_number = EXCLUDED.phone_number,
                total_points = EXCLUDED.total_points
            RETURNING *;
        `;
        const values = [
            offenderData.offender_name,
            offenderData.license_number,
            offenderData.license_plate,
            offenderData.vehicle_model,
            offenderData.phone_number,
            offenderData.total_points || 0, // Default to 0
        ];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error adding offender:", error);
            throw error;
        }
    },

    addOffense: async (offenseData) => {
        const query = `
            INSERT INTO offender_offenses (
                license_number,
                offense_datetime,
                location,
                offense_type,
                officer_name,
                badge_number,
                penalty_points,
                fine_amount,
                fine_status
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9
            ) RETURNING *;
        `;
        const values = [
            offenseData.license_number,
            offenseData.offense_datetime,
            offenseData.location,
            offenseData.offense_type,
            offenseData.officer_name,
            offenseData.badge_number,
            offenseData.penalty_points,
            offenseData.fine_amount,
            offenseData.fine_status || 'pending', // Default to 'pending' if not provided
        ];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error adding offense:", error);
            throw error;
        }
    },

    getAllOffenders: async () => {
        const query = "SELECT * FROM offenders ORDER BY created_at DESC;";
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error fetching offenders:", error);
            throw error;
        }
    },

    getOffenderByLicenseNumber: async (license_number) => {
        const query = "SELECT * FROM offenders WHERE license_number = $1;";
        try {
            const result = await pool.query(query, [license_number]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching offender by license number:", error);
            throw error;
        }
    },

    getOffensesByLicenseNumber: async (license_number) => {
        const query = "SELECT * FROM offender_offenses WHERE license_number = $1 ORDER BY offense_datetime DESC;";
        try {
            const result = await pool.query(query, [license_number]);
            return result.rows;
        } catch (error) {
            console.error("Error fetching offenses by license number:", error);
            throw error;
        }
    },

    getAllOffenses: async () => {
        const query = `
            SELECT oo.id, o.offender_name, o.license_number, o.license_plate, 
                   oo.offense_type, oo.offense_datetime, oo.location,
                   oo.penalty_points, oo.fine_amount, oo.fine_status,
                   oo.officer_name, oo.badge_number
            FROM offender_offenses oo
            JOIN offenders o ON o.license_number = oo.license_number
            ORDER BY oo.offense_datetime DESC;
        `;
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error fetching all offenses:", error);
            throw error;
        }
    },

    deleteOffender: async (license_number) => {
        const query = "DELETE FROM offenders WHERE license_number = $1 RETURNING *;";
        try {
            const result = await pool.query(query, [license_number]);
            return result.rows[0];
        } catch (error) {
            console.error("Error deleting offender:", error);
            throw error;
        }
    },

    updatePoints: async (license_number, newPoints) => {
        const query = `
            UPDATE offenders
            SET total_points = $1
            WHERE license_number = $2
            RETURNING *;
        `;
        const values = [newPoints, license_number];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error updating points:", error);
            throw error;
        }
    },

    suspendLicense: async (license_number) => {
        const query = `
            UPDATE offenders
            SET total_points = 0, license_status = 'Suspended'
            WHERE license_number = $1
            RETURNING *;
        `;
        const values = [license_number];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error suspending license:", error);
            throw error;
        }
    },

    updateFineStatus: async (offenseId, newStatus) => {
        const query = `
            UPDATE offender_offenses
            SET fine_status = $1
            WHERE id = $2
            RETURNING *;
        `;
        const values = [newStatus, offenseId];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error updating fine status:", error);
            throw error;
        }
    },
};


module.exports = Offender;

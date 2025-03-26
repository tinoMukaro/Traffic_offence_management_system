const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const offenseController = require('../controllers/offenseController');

// Get all offenses
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM offenses ORDER BY offense_description ASC');
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching offenses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// Get all categories with offenses
router.get('/categories', offenseController.getAllCategoriesWithOffenses);

// Update an offense
router.put('/offenses/:offenseId', offenseController.updateOffense);

// Add a new offense
router.post('/offenses', offenseController.addOffense);

// Delete an offense
router.delete('/offenses/:offenseId', offenseController.deleteOffense);

module.exports = router;

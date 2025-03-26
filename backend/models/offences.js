const pool = require("../config/db");

// Get all offense categories with their offenses
const getAllCategoriesWithOffenses = async () => {
  const query = `
    SELECT oc.id AS category_id, oc.category_name, 
           o.id AS offense_id, o.offense_description, o.fine_amount, o.penalty_points
    FROM offense_categories oc
    LEFT JOIN offenses o ON oc.id = o.category_id
    ORDER BY oc.id, o.id;
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Update an offense's fine amount and penalty points
const updateOffense = async (offenseId, fineAmount, penaltyPoints) => {
  const query = `
    UPDATE offenses
    SET fine_amount = $1, penalty_points = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [fineAmount, penaltyPoints, offenseId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Add a new offense
const addOffense = async (offenseDescription, fineAmount, penaltyPoints, categoryId) => {
  const query = `
    INSERT INTO offenses (offense_description, fine_amount, penalty_points, category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [offenseDescription, fineAmount, penaltyPoints, categoryId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete an offense
const deleteOffense = async (offenseId) => {
  const query = `
    DELETE FROM offenses
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [offenseId]);
  return result.rows[0];
};

module.exports = {
  getAllCategoriesWithOffenses,
  updateOffense,
  addOffense,
  deleteOffense,
};
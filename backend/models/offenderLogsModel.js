
const pool = require('../config/db'); // assuming you're using pg Pool and have a db.js file

const getOffenderLogs = async () => {
  const query = 'SELECT * FROM offender_logs ORDER BY created_at DESC';
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  getOffenderLogs,
};

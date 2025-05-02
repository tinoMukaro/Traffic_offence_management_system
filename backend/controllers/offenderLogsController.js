
const { getOffenderLogs } = require('../models/offenderLogsModel');

const fetchOffenderLogs = async (req, res) => {
  try {
    const logs = await getOffenderLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching offender logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchOffenderLogs,
};

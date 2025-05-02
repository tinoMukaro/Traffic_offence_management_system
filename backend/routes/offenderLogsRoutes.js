
const express = require('express');
const router = express.Router();
const { fetchOffenderLogs } = require('../controllers/offenderLogsController');

router.get('/offender-logs', fetchOffenderLogs);

module.exports = router;

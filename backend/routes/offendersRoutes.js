const express = require("express");
const router = express.Router();
const {
    addOffense,
    getAllOffenses,
    getOffensesByLicenseNumber,
    getOffenderByLicenseNumber,
    getAllOffenders, 
    updateFineStatus
} = require("../controllers/offendersController"); 

router.post("/", addOffense);

router.get("/offenses/all", getAllOffenses);
router.get("/offenses/:license_number", getOffensesByLicenseNumber);
router.get("/:license_number", getOffenderByLicenseNumber);

router.get("/offenders/all", getAllOffenders);
router.put("/offenses/:offenseId/update-fine-status", updateFineStatus);

module.exports = router;

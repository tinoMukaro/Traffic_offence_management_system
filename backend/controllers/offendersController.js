const Offender = require("../models/offenders");
const { sendSMSNotification } = require("../services/twilioService");

// Function to calculate adjusted fine based on penalty points
function calculateAdjustedFine(fine_amount, totalPoints) {
    if (totalPoints >= 20) {
        return fine_amount * 1.5;
    }
    return fine_amount;
}

// Add offense function with Twilio SMS integration using the service
const addOffense = async (req, res) => {
    try {
        const {
            license_number,
            penalty_points,
            fine_amount,
            offender_name,
            license_plate,
            vehicle_model,
            phone_number,
            offense_datetime,
            location,
            offense_type,
            officer_name,
            badge_number,
        } = req.body;

        // Check if the driver exists
        const driver = await Offender.getOffenderByLicenseNumber(license_number);

        // If the driver exists and their license is suspended, return an error
        if (driver && driver.license_status === 'Suspended') {
            return res.status(400).json({
                success: false,
                message: "Driver is suspended. Cannot log offense.",
            });
        }

        // Calculate total points
        const totalPoints = driver ? driver.total_points + penalty_points : penalty_points;

        // Apply fine increase if the driver has 20 or more points
        const adjustedFine = calculateAdjustedFine(fine_amount, totalPoints);

        // Suspend license if the driver has 30 or more points
        if (totalPoints >= 30) {
            await Offender.suspendLicense(license_number);
            return res.status(200).json({
                success: true,
                message: "License suspended. Points reset to 0.",
                data: { license_status: "Suspended", total_points: 0 },
            });
        }

        // Add or update the offender
        const updatedDriver = await Offender.addOffender({
            offender_name,
            license_number,
            license_plate,
            vehicle_model,
            phone_number,
            total_points: totalPoints, // Update total_points for existing drivers
        });

        // Log the offense
        const newOffense = await Offender.addOffense({
            license_number,
            offense_datetime,
            location,
            offense_type,
            officer_name,
            badge_number,
            penalty_points,
            fine_amount: adjustedFine,
            fine_status: "Pending", // Default fine status
        });

        // Send SMS notification to the offender using the Twilio service
        if (phone_number) {
            const message = `
                Traffic Offense Alert:
                Offender: ${offender_name}
                License: ${license_number}
                Vehicle: ${license_plate} (${vehicle_model})
                Offense: ${offense_type}
                Location: ${location}
                Fine: $${adjustedFine}
                Points Added: ${penalty_points}
                Status: Pending Payment
            `;

            await sendSMSNotification(phone_number, message);
        }

        res.status(201).json({
            success: true,
            message: "Offense logged successfully, and SMS notification sent.",
            data: newOffense,
        });
    } catch (error) {
        console.error("Error logging offense:", error);
        res.status(500).json({
            success: false,
            message: "Failed to log offense.",
            error: error.message,
        });
    }
};

// Other controller functions (e.g., getAllOffenses, getAllOffenders, etc.)

const getAllOffenses = async (req, res) => {
    try {
        // Fetch all offenses from the database
        const offenses = await Offender.getAllOffenses();
        res.status(200).json({
            success: true,
            message: "Offenses fetched successfully.",
            data: offenses,
        });
    } catch (error) {
        console.error("Error fetching offenses:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch offenses.",
            error: error.message,
        });
    }
};

const getAllOffenders = async (req, res) => {
    try {
        const offenders = await Offender.getAllOffenders();
        res.status(200).json({
            success: true,
            message: "Offenders fetched successfully.",
            data: offenders,
        });
    } catch (error) {
        console.error("Error fetching offenders:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch offenders.",
            error: error.message,
        });
    }
};

const getOffensesByLicenseNumber = async (req, res) => {
    try {
        const { license_number } = req.params;

        // Fetch offenses for the given license_number
        const offenses = await Offender.getOffensesByLicenseNumber(license_number);

        if (offenses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No offenses found for the given license number.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Offenses fetched successfully.",
            data: offenses,
        });
    } catch (error) {
        console.error("Error fetching offenses by license number:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch offenses.",
            error: error.message,
        });
    }
};

const getOffenderByLicenseNumber = async (req, res) => {
    try {
        const { license_number } = req.params;

        // Fetch offender details for the given license_number
        const offender = await Offender.getOffenderByLicenseNumber(license_number);

        if (!offender) {
            return res.status(404).json({
                success: false,
                message: "Offender not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Offender fetched successfully.",
            data: offender,
        });
    } catch (error) {
        console.error("Error fetching offender by license number:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch offender.",
            error: error.message,
        });
    }
};

const updateFineStatus = async (req, res) => {
    try {
        const { offenseId } = req.params;
        const { newStatus } = req.body;

        // Update the fine status
        const updatedOffense = await Offender.updateFineStatus(offenseId, newStatus);

        if (!updatedOffense) {
            return res.status(404).json({
                success: false,
                message: "Offense not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Fine status updated successfully.",
            data: updatedOffense,
        });
    } catch (error) {
        console.error("Error updating fine status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update fine status.",
            error: error.message,
        });
    }
};

module.exports = {
    addOffense,
    getAllOffenses,
    getOffensesByLicenseNumber,
    getOffenderByLicenseNumber,
    getAllOffenders,
    updateFineStatus,
};

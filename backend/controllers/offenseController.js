const offenseModel = require('../models/offences');

// Get all categories with offenses
const getAllCategoriesWithOffenses = async (req, res) => {
  try {
    const data = await offenseModel.getAllCategoriesWithOffenses();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
};

// Update an offense
const updateOffense = async (req, res) => {
  const { offenseId } = req.params;
  const { fineAmount, penaltyPoints } = req.body;
  try {
    const updatedOffense = await offenseModel.updateOffense(offenseId, fineAmount, penaltyPoints);
    res.status(200).json(updatedOffense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating offense', error: error.message });
  }
};

// Add a new offense
const addOffense = async (req, res) => {
  const { offenseDescription, fineAmount, penaltyPoints, categoryId } = req.body;
  try {
    const newOffense = await offenseModel.addOffense(offenseDescription, fineAmount, penaltyPoints, categoryId);
    res.status(201).json(newOffense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding offense', error: error.message });
  }
};

// Delete an offense
const deleteOffense = async (req, res) => {
  const { offenseId } = req.params;
  try {
    const deletedOffense = await offenseModel.deleteOffense(offenseId);
    res.status(200).json(deletedOffense);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting offense', error: error.message });
  }
};

module.exports = {
  getAllCategoriesWithOffenses,
  updateOffense,
  addOffense,
  deleteOffense,
};
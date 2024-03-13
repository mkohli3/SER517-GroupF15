// Author - Heet Punjawat 
// server/DBroutes/gradingSheet.js

const express = require('express');
const router = express.Router();
const GradingSheet = require('../DBmodels/GradingSheet');

// POST Route to create a new grading sheet
router.post('/create', async (req, res) => {
  // Extract 'title' from the request body, provided by the user when creating a new grading sheet.
  const { title } = req.body;

  // Creates a new instance of the GradingSheet model using the extracted title.
  const newSheet = new GradingSheet({
    title,
    gradingCriteria: [], 
    ASUriteId: [], 
    StudentName: []
  });

  try {
    const savedSheet = await newSheet.save(); // Asynchronously saves the document to the database.
    res.status(201).json(savedSheet); // Sends the saved document back as a response with status code 201 (Created).
  } catch (error) {
    res.status(400).json({ message: error.message }); // Catches and sends any errors that occur.
  }
});

// Route to add or update criteria for a specific grading sheet
router.post('/update-criteria', async (req, res) => {
  const { id, gradingCriteria } = req.body; // Expect gradingSheet ID and criteria array

  try {
    const sheet = await GradingSheet.findById(id);
    if (!sheet) {
      return res.status(404).json({ message: 'Grading sheet not found' });
    }

    sheet.gradingCriteria = gradingCriteria;
    const updatedSheet = await sheet.save();

    res.status(200).json(updatedSheet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
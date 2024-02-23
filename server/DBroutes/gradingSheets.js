// Author - Heet Punjawat 
// server/DBroutes/gradingSheets.js

const express = require('express');
const router = express.Router();
const GradingSheet = require('../DBmodels/GradingSheet');

// POST route to create a grading sheet
router.post('/create', async (req, res) => {
  const { title } = req.body; // Only expect title for sheet creation
  
  const newSheet = new GradingSheet({
    title,
    students: [] // Initialize with an empty students array
  });

  try {
    const savedSheet = await newSheet.save();
    res.status(201).json(savedSheet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// GET route to fetch all grading sheets
router.get('/', async (req, res) => {
  try {
    const sheets = await GradingSheet.find();
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET route to fetch a single grading sheet by ID
router.get('/:id', async (req, res) => {
  try {
    const sheet = await GradingSheet.findById(req.params.id);
    if (sheet) {
      res.json(sheet);
    } else {
      res.status(404).json({ message: 'Grading Sheet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a student to a grading sheet
router.post('/:id/add-student', async (req, res) => {
  const { ASUriteId, StudentName } = req.body;
  try {
    const sheet = await GradingSheet.findById(req.params.id);
    if (sheet) {
      const serialNo = sheet.students.length + 1; // Auto-increment serialNo
      const newStudent = { serialNo, ASUriteId, StudentName };
      sheet.students.push(newStudent);
      await sheet.save();
      res.status(200).json(sheet);
    } else {
      res.status(404).json({ message: 'Grading Sheet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;




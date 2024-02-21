// Author - Heet Punjawat 
// server/DBroutes/gradingSheet.js

const express = require('express');
const router = express.Router();
const GradingSheet = require('../DBmodels/GradingSheet');

// POST route to create a grading sheet
router.post('/create', async (req, res) => {
  const { title, serialNo, ASUriteId, StudentName } = req.body;
  
  const newSheet = new GradingSheet({
    title,
    serialNo,
    ASUriteId,
    StudentName
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



module.exports = router;




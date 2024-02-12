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

module.exports = router;

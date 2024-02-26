// Author - Heet Punjawat 
// server/DBroutes/gradingSheet.js

const express = require('express');
const router = express.Router();
const GradingSheet = require('../DBmodels/GradingSheet');

// POST route to create a grading sheet
// router.post('/create', async (req, res) => {
//   const { title, serialNo, ASUriteId, StudentName } = req.body;

  router.post('/save-criteria', async (req, res) => {
    const { title, serialNo, ASUriteId, StudentName, gradingCriteria } = req.body;
  
  const newSheet = new GradingSheet({
    title,
    serialNo,
    ASUriteId,
    StudentName,
    gradingCriteria
  });

  try {
    const savedSheet = await newSheet.save();
    res.status(201).json(savedSheet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/criteria/:serialNo', async (req, res) => {
  try {
    const sheet = await GradingSheet.findOne({ serialNo: req.params.serialNo });
    if (!sheet) {
      return res.status(404).json({ message: 'Grading sheet not found' });
    }
    res.json(sheet.gradingCriteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;

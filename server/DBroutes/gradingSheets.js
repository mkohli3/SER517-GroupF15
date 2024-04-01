// Author - Heet Punjawat 
// server/DBroutes/gradingSheet.js

const express = require('express');
const router = express.Router();
const GradingSheet = require('../DBmodels/GradingSheet');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Configure Multer for Excel file uploads
const upload = multer({ 
  dest: 'uploads/', 
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return cb(new Error('Only .xlsx files are allowed!'), false);
    }
    cb(null, true);
  }
});

router.post('/create', async (req, res) => {
  const { title } = req.body;
  const newSheet = new GradingSheet({ title });
  try {
    const savedSheet = await newSheet.save();
    res.status(201).json(savedSheet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/update-criteria', async (req, res) => {
  const { id, gradingCriteria } = req.body;
  try {
    const sheet = await GradingSheet.findById(id);
    if (!sheet) return res.status(404).json({ message: 'Grading sheet not found' });
    sheet.gradingCriteria = gradingCriteria;
    const updatedSheet = await sheet.save();
    res.status(200).json(updatedSheet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/import-criteria', upload.single('excelFile'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });

  const filePath = path.join(__dirname, '..', req.file.path);
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const { id } = req.body;
    const sheet = await GradingSheet.findById(id);
    if (!sheet) return res.status(404).json({ message: 'Grading sheet not found.' });

    sheet.gradingCriteria = data;
    const updatedSheet = await sheet.save();

    fs.unlinkSync(filePath); // Clean up uploaded file after processing
    res.status(200).json(updatedSheet);
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // Clean up if error occurs
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

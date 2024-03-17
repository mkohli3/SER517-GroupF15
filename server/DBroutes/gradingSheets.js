// Author - Heet Punjawat 
// server/DBroutes/gradingSheet.js

const express = require('express');
const router = express.Router();
const GradingSheet = require('../DBmodels/GradingSheet');
const multer = require('multer');
const xlsx = require('xlsx');

// Multer setup for handling Excel file uploads
const upload = multer({ 
  dest: 'uploads/', // Temporary folder to store uploaded files
  fileFilter: function (req, file, cb) {
    // Accept Excel files only (.xlsx)
    if (!file.originalname.match(/\.(xlsx)$/)) {
      return cb(new Error('Only .xlsx Excel files are allowed!'), false);
    }
    cb(null, true);
  }
});

// POST Route to create a new grading sheet
router.post('/create', async (req, res) => {
  const { title, ASUriteId, StudentName } = req.body; // Correctly extract ASUriteId and StudentName from the request body

  const newSheet = new GradingSheet({
    title,
    gradingCriteria: [],
    ASUriteId, 
    StudentName 
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
  const { id, gradingCriteria } = req.body;

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

// Route to handle Excel file upload and import grading criteria
router.post('/import-criteria', upload.single('excelFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // 'id' is passed in the request body for identifying which grading sheet to update
    const { id } = req.body;
    const sheet = await GradingSheet.findById(id);
    if (!sheet) {
      return res.status(404).json({ message: 'Grading sheet not found.' });
    }

    sheet.gradingCriteria = data; // Replace the existing grading criteria with the imported ones
    const updatedSheet = await sheet.save();
    res.status(200).json(updatedSheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
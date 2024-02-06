// backend/routes/gradingSheets.js
const express = require('express');
const router = express.Router();
const GradingSheet = require('../models/GradingSheet');

// Route to create a new grading sheet
router.post('/', async (req, res) => {
    const gradingSheet = new GradingSheet({
        title: req.body.title,
        sections: req.body.sections
    });

    try {
        const newGradingSheet = await gradingSheet.save();
        res.status(201).json(newGradingSheet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

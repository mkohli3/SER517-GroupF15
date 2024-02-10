// backend/models/GradingSheet.js
const mongoose = require('mongoose');

const gradingSheetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    sections: [
        {
            title: { type: String, required: true },
            criteria: [
                {
                    description: String,
                    points: Number,
                    individual: Boolean
                }
            ]
        }
    ]
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);

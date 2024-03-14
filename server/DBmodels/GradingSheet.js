const mongoose = require('mongoose');

// Updated grading criteria schema to include validation and separate the criteria more clearly
const gradingCriteriaSchema = new mongoose.Schema({
  criteriaName: { type: String, required: [true, 'Criteria name is required'] },
  points: { type: Number, required: [true, 'Points are required'], min: [0, 'Points cannot be negative'] },
  criteriaType: { type: String, required: [true, 'Criteria type is required'], enum: ['group', 'individual'] }
});

const gradingSheetSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  ASUriteId: { type: String, required: false },
  StudentName: { type: String, required: false },
  gradingCriteria: [gradingCriteriaSchema]
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);

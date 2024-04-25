const mongoose = require('mongoose');

const gradingCriteriaSchema = new mongoose.Schema({
  criteria: { type: String, required: [true, 'Criteria name is required'] },
  points: { type: Number, required: [true, 'Points are required'], min: [0, 'Points cannot be negative'] },
  type: { type: String, required: [true, 'Criteria type is required']},
  deductions: [
    {
      points: { type: Number, required: [true, 'Deduction points are required'] },
      comment: { type: String, default: '' }
    }
  ]
});

const studentSchema = new mongoose.Schema({
  groupname: { type: String, required: [true, 'Group name is required'] },
  asuid: { type: String, required: [true, 'ASU ID is required'] },
  points: [
    {
      criteria: { type: String, required: true },
      points: { type: Number, required: true },
      comment: { type: String, default: '' }
    }
  ],
  additionalComments: { type: String, default: '' },
  totalPoints: { type: Number, required: true }
});

const gradingSheetSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  gradingCriteria: [gradingCriteriaSchema],
  students: [studentSchema]
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);

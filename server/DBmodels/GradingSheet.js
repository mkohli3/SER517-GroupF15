// Author - Heet Punjawat 
// server/DBmodels/GradingSheet.js

const mongoose = require('mongoose');

const gradingCriteriaSchema = new mongoose.Schema({
  criteriaName: String,
  points: Number,
  applicableTo: { type: String, enum: ['group', 'individual', 'both'] },
  hiddenComments: Boolean,
}, { _id: false });

const gradingSheetSchema = new mongoose.Schema({
  title: String,
  serialNo: Number,
  ASUriteId: String,
  StudentName: String,
  gradingCriteria: [gradingCriteriaSchema] 
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);
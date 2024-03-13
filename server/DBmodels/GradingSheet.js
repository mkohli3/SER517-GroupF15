// Author - Heet Punjawat 
// server/DBmodels/GradingSheet.js

const mongoose = require('mongoose');

const gradingCriteriaSchema = new mongoose.Schema({
  criteriaName: String,
  points: Number,
  groupCriteria: Boolean,
  individualCriteria: Boolean
}, { _id: false }); // Keeping _id: false because we don't need separate IDs for subdocuments for now.

const gradingSheetSchema = new mongoose.Schema({
  title: String,
  serialNo: Number,
  ASUriteId: String,
  StudentName: String,
  gradingCriteria: [gradingCriteriaSchema] // Embeds the grading criteria directly into each grading sheet.
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);

// Author - Heet Punjawat 
// server/DBmodels/GradingSheet.js

const mongoose = require('mongoose');

const gradingSheetSchema = new mongoose.Schema({
  title: String,
  serialNo: Number,
  ASUriteId: String,
  StudentName: String
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);

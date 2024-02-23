// Author - Heet Punjawat 
// server/DBmodels/GradingSheet.js

const mongoose = require('mongoose');

const gradingSheetSchema = new mongoose.Schema({
  title: String,
  students: [{
    serialNo: Number,
    ASUriteId: Number,
    StudentName: String
  }]
});


module.exports = mongoose.model('GradingSheet', gradingSheetSchema);

const mongoose = require('mongoose');

const gradingCriteriaSchema = new mongoose.Schema({
  criteriaName: {
    type: String,
    required: [true, 'Criteria name is required'],
  },
  points: {
    type: Number,
    required: [true, 'Points are required'],
    min: [0, 'Points cannot be negative'],
  },
  criteriaType: {
    type: String,
    required: [true, 'Criteria type is required'],
    enum: ['group', 'individual'],
  },
});

const gradingSheetSchema = new mongoose.Schema({
  groupname: {
    type: String,
    required: [true, 'Group name is required'],
  },
  asuid: {
    type: String,
    required: [true, 'ASU ID is required'],
  },
  points: {
    type: Map,
    of: Number,
  },
});

module.exports = mongoose.model('GradingSheet', gradingSheetSchema);
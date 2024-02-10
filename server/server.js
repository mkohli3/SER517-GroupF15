// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const gradingSheetsRouter = require('./routes/gradingSheets');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb://localhost/gradingTool', { useNewUrlParser: true, useUnifiedTopology: true });

//app.use('/api/grading-sheets', gradingSheetsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

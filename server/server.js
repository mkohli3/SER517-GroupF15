// Author - Heet Punjawat 
// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const gradingSheetRouter = require('./DBroutes/gradingSheets'); 

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies
const cors = require('cors');
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost/gradingTool')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Use routes
app.use('/api/grading-sheets', gradingSheetRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



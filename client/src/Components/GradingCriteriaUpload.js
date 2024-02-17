import '../App.css';
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import axios from 'axios';
import { read, utils } from 'xlsx';

import ASULogo from '../utils/ASU_logo.png';
import { LinearProgress } from '@mui/material';


function GradingCriteriaUpload() {
  const [csvData, setCsvData] = useState(false); //aj
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [criteriaList, setCriteriaList] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

//aj
  const [displayedCsvData, setDisplayedCsvData] = useState(false);
  const [fileError, setFileError] = useState(""); 
//aj

const simulateUpload = (file) => {
  return new Promise((resolve) => {
    setIsUploading(true);
    const totalSteps = 30; // Total steps to complete the "upload"
    let currentStep = 0;

    const step = () => {
      setUploadProgress((currentStep / totalSteps) * 100);
      if (currentStep < totalSteps) {
        currentStep++;
        setTimeout(step, 20); // Simulate time taken for each step
      } else {
        resolve(); // Resolve the promise once "upload" completes
      }
    };

    step();
  });
};


const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    setFileError("No file selected.");
    return;
  }
  setIsUploading(true);
  setFileError(""); // Clear any existing error message
  setShowPreview(true); // Show preview upon new file upload
  await simulateUpload(file);
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = file.name.endsWith('.xlsx') ? new Uint8Array(e.target.result) : e.target.result;
      const workbook = read(data, {type: file.name.endsWith('.xlsx') ? 'array' : 'binary'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet, {header: 1});
      setFileData(json);
      setIsUploading(false); // End the upload process
      setUploadProgress(0); // Reset the progress bar
    } catch (error) {
      setFileError("Failed to read file.");
      setIsUploading(false);
    }
  };

  if (file.name.endsWith('.xlsx')) {
    reader.readAsArrayBuffer(file);
  } else {
    reader.readAsBinaryString(file);
  }
};
const handleNextButtonClick = () => {
  if (!fileData.length) { // Check if fileData is empty
    setFileError("Please upload a file before proceeding.");
  } else {
    setShowPreview(false); // Hide preview on clicking Next
  }
};
// aj
  const addCriteria = () => {
    setCriteriaList([...criteriaList, { criteria: "", points: 0, group: false, individual: false }]);
  };

  const updateCriteria = (index, field, value) => {
    const newCriteriaList = [...criteriaList];
    if (field === 'points') value = parseInt(value, 10) || 0;
    newCriteriaList[index][field] = value;
    setCriteriaList(newCriteriaList);
  };
  const renderTablePreview = () => {
    if (!fileData.length || !showPreview) return null; // Only render if there's data and preview is enabled
    const headers = fileData[0].map((header, index) => typeof header === 'string' ? header : `Column ${index + 1}`);
    const dataRows = fileData.slice(1);
    return (
      <div style={{ overflowX: 'auto', marginTop: '20px', width: '100%' }}>
        <table style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead>
            <tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {dataRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCriteriaInputs = () => {
    return criteriaList.map((criteria, index) => (
      <Paper key={index} style={{ padding: '10px', margin: '10px 0', width: '100%' }}>
        <TextField
          label="Criteria Name"
          variant="outlined"
          fullWidth
          value={criteria.criteria}
          onChange={(e) => updateCriteria(index, 'criteria', e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Points"
          type="number"
          variant="outlined"
          fullWidth
          value={criteria.points}
          onChange={(e) => updateCriteria(index, 'points', e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <FormGroup row>
          <FormControlLabel
            control={<Checkbox checked={criteria.group} onChange={(e) => updateCriteria(index, 'group', e.target.checked)} />}
            label="Group Criteria"
          />
          <FormControlLabel
            control={<Checkbox checked={criteria.individual} onChange={(e) => updateCriteria(index, 'individual', e.target.checked)} />}
            label="Individual Criteria"
          />
        </FormGroup>
      </Paper>
    ));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <img src={ASULogo} alt="ASU Logo" style={{ height: '80px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5" style={{ fontSize: '24px', fontWeight: 'bold', color: '#800000'}}>
          Grading Tool
        </Typography>

        {!showManualEntry && (
          <>
            <Typography component="h2" variant="h6" style={{ fontSize: '18px', fontWeight: 'normal', color: '#800000', marginBottom: '20px' }}>
              Enter grading criteria below
            </Typography>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv, .xlsx"
              style={{ margin: '20px 0', display: 'block' }}
            />
            
{/* //AJ */}

      {/* Display error message if file upload fails */}
      {fileError && (
        <Typography variant="body2" color="error" component="p" style={{ marginTop: '10px' }}>
          {fileError}
        </Typography>
      )}
       {renderTablePreview()}
      
        {/* Display CSV data on the page */}
        {/* <input type="file" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        {fileError && <Typography color="error">{fileError}</Typography>}
        {renderTablePreview()} */}

      {/* Updated Next button to trigger handleNextButtonClick */}
      {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}

      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleNextButtonClick}
        style={{ margin: '5px 0' }}
      >
        Next
      </Button>
      
{/* Aj */}
            <Typography component="h1" variant="h5" style={{ fontSize: '16px', fontWeight: 'bold', color: '#800000' }}>
              Or
            </Typography>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setShowManualEntry(true)}
              style={{ margin: '10px 0' }}
            >
              Enter Grading Criteria Manually
            </Button>
          </>
        )}
        {showManualEntry && (
          <>
            {renderCriteriaInputs()}
            <Button variant="contained" color="secondary" onClick={addCriteria} style={{ margin: '10px 0' }}>
              Add Grading Criteria
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={() => console.log('Criteria saved', criteriaList)}
              style={{ margin: '20px 0' }}
            >
              Save Criteria
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default GradingCriteriaUpload;

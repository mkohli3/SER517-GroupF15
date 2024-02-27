import '../App.css';
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import axios from 'axios';
import { read, utils } from 'xlsx';
import { useNavigate } from 'react-router-dom';

import ASULogo from '../utils/ASU_logo.png';
import { LinearProgress } from '@mui/material';
import './GradingCriteriaUpload.css'
import MainScreen from './MainScreen';
import CSVTableDisplay from './CSVTableDisplay';



function GradingCriteriaUpload() {
  const [csvData, setCsvData] = useState(false); //aj
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [criteriaList, setCriteriaList] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();


  const [displayedCsvData, setDisplayedCsvData] = useState(false);
  const [fileError, setFileError] = useState(""); 

  const renderTablePreview = () => {
    if (!fileData.length || !displayedCsvData) return null; // Only render if there's data and preview is enabled
    const headers = fileData[0].map((header, index) => typeof header === 'string' ? header : `Column ${index + 1}`);
    const dataRows = fileData.slice(1);
  
    return <CSVTableDisplay headers={headers} data={fileData} />;
  };


const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    setFileError("No file selected.");
    return;
  }
  setIsUploading(true);
  setFileError(""); // Clear any existing error
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = file.name.endsWith('.xlsx') ? new Uint8Array(e.target.result) : e.target.result;
      const workbook = read(data, {type: file.name.endsWith('.xlsx') ? 'array' : 'binary'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet, {header: 1});
      const newCriteriaList = json.map((row) => {
        return {
          criteria: row[0] || "", // Assuming the criteria name is in the first column
          points: parseInt(row[1], 10) || 0, // Assuming points are in the second column
          group: parseInt(row[2], 10) === 0, // Assuming 0 means individual, adjust as needed
          individual: parseInt(row[2], 10) !== 0, // Assuming 0 means individual, adjust as needed
        };
      });
      setCriteriaList(newCriteriaList);
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
    
    navigate('/main-screen', { state: { criteriaList : criteriaList } });
    
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
      <Paper elevation={3} style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
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
      
      {renderTablePreview()} {/* Render CSV table preview */}
      
      {/* Updated Next button to trigger handleNextButtonClick */}
      {isUploading && <LinearProgress variant="determinate" value={uploadProgress} />}

      <button
        type="button"
        className="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleNextButtonClick}
        style={{ margin: '5px 0' }}
        >
        Next
      </button>
      
{/* Aj */}
            <Typography component="h1" variant="h5" style={{ fontSize: '16px', fontWeight: 'bold', color: '#800000' }}>
              Or
            </Typography>
            <button
              type="button"
              className="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setShowManualEntry(true)}
              style={{ margin: '10px 0' }}
            >
              Enter Grading Criteria Manually
            </button>
          </>
        )}
        {showManualEntry && (
          <>
            {renderCriteriaInputs()}
            <button variant="contained" color="secondary" onClick={addCriteria} style={{ margin: '10px 0' }}>
              Add Grading Criteria
            </button>
            <button
              type="button"
              className="button"
              variant="contained"
              color="primary"
              onClick={() => console.log('Criteria saved', criteriaList)}
              style={{ margin: '20px 0' }}
            >
              Save Criteria
            </button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default GradingCriteriaUpload;

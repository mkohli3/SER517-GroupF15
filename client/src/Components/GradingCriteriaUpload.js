import '../App.css';
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import axios from 'axios';

import ASULogo from '../utils/ASU_logo.png';

function GradingCriteriaUpload() {
  const [csvData, setCsvData] = useState(false); //aj
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [criteriaList, setCriteriaList] = useState([]);

//aj
  const [displayedCsvData, setDisplayedCsvData] = useState(false);
  const [fileError, setFileError] = useState(""); 
//aj

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
 
      const reader = new FileReader();
      reader.onload = function(e) {
        const contents = e.target.result;
        //console.log('CSV Data:', contents);
        setDisplayedCsvData(contents); // Update state to store CSV data aj
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a CSV file.");
    }
  };

  // Gives out error message and handles next button
  const handleNextButtonClick = () => {
    if (!displayedCsvData) {
      setFileError("Please upload a CSV file with grading criteria before proceeding.");
    } else {
      setDisplayedCsvData(true);
      setFileError("Please proceed to add student details "); // Clear file error when proceeding
    }
  };
  //Handles  the manual entry form submission
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
      
        {/* Display CSV data on the page */}
        {displayedCsvData && (
              <div style={{ margin: '20px 0', whiteSpace: 'pre-line' }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  CSV Data:
                  <br />
                  {displayedCsvData}
                </Typography>
              </div>
            )}

      {/* Updated Next button to trigger handleNextButtonClick */}
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        // onClick={handleNextButtonClick}
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

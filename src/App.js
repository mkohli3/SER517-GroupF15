import './App.css';
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import axios from 'axios';

import ASULogo from './ASU_logo.png';

function App() {
  const [csvData, setCsvData] = useState(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [criteriaList, setCriteriaList] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
 
      const reader = new FileReader();
      reader.onload = function(e) {
        const contents = e.target.result;
        console.log('CSV Data:', contents);

      };
      reader.readAsText(file);
    } else {
      alert("Please upload a CSV file.");
    }
  };

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
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setShowManualEntry(false)}
              style={{ margin: '5px 0' }}
            >
              Next
            </Button>
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

export default App;

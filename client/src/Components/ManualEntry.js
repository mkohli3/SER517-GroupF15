// ManualEntry.js
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import axios from 'axios';

import ASULogo from '../utils/ASU_logo.png';

function ManualEntry() {
  const [criteriaList, setCriteriaList] = useState([]);

  // New state to track individual points for each student
  const [individualPoints, setIndividualPoints] = useState({});

  const addCriteria = () => {
    setCriteriaList([...criteriaList, { criteria: "", group: false, individual: false, hiddenComments: false }]);
  };

  const updateCriteria = (index, field, value) => {
    const newCriteriaList = [...criteriaList];
    newCriteriaList[index][field] = value;
    setCriteriaList(newCriteriaList);
  };

  // New function to update individual points
  const updateIndividualPoints = (studentName, points) => {
    setIndividualPoints((prevPoints) => ({
      ...prevPoints,
      [studentName]: points,
    }));
  };

  const saveGradingCriteria = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/grading-sheets/save-criteria`, {
        title: 'Example Title',
        serialNo: 1,
        ASUriteId: 'asu123',
        StudentName: 'John Doe',
        gradingCriteria: criteriaList,
        // Pass the individual points to the backend
        individualPoints,
      });
      
      console.log('Criteria saved:', response.data);
      alert('Grading criteria saved successfully!');
    } catch (error) {
      console.error('Failed to save grading criteria:', error?.response?.data ? error.response.data : 'Unknown error');
      alert('Failed to save grading criteria. ' + (error?.response?.data ? error.response.data : 'Please check your network or contact support.'));
    }
  };

  const renderCriteriaInputs = () => {
    return criteriaList.map((criteria, index) => (
      // ... (existing code)
      <TableRow key={index}>
        <TableCell>{criteria.criteria}</TableCell>
        <TableCell>{criteria.group ? 'GRP' : 'INDV'}</TableCell>
        <TableCell>
          <TextField
            label="Points"
            type="number"
            variant="outlined"
            fullWidth
            value={individualPoints[criteria.studentName] || ''}
            onChange={(e) => updateIndividualPoints(criteria.studentName, e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </TableCell>
      </TableRow>
      // ... (existing code)
    ));
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <img src={ASULogo} alt="ASU Logo" style={{ height: '80px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5" style={{ fontSize: '24px', fontWeight: 'bold', color: '#800000' }}>
          Manual Entry of Grading Criteria
        </Typography>
        {renderCriteriaInputs()}
        <Button variant="contained" color="secondary" onClick={addCriteria} style={{ margin: '10px 0' }}>
          Add New Criteria
        </Button>
        <Button variant="contained" color="primary" onClick={saveGradingCriteria} style={{ margin: '10px 0' }}>
          Save Criteria
        </Button>
      </Paper>
    </Container>
  );
}

export default ManualEntry;


//  <Button type="button" variant="contained" color="primary" onClick={handleManualEntryClick} style={{ marginTop: '20px' }}>
// Enter Grading Criteria Manually
// </Button> 



// const handleManualEntryClick = () => {
//     navigate('/manual-entry');
// };

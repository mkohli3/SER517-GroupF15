import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import './ManualGradingCriteriaUpload.css'



function ManualGradingCriteriaUpload() {
  const [criteriaList, setCriteriaList] = useState([]);
  const navigate = useNavigate();


  const updateCriteria = (index, key, value) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[index][key] = value;
    setCriteriaList(updatedCriteriaList);
  };

  const addCriteria = () => {
    setCriteriaList([...criteriaList, { criteria: '', points: '', group: false, individual: false }]);
  };

const handleSaveButtonClick = () => {
    navigate('/main-screen', { state: { criteriaList : criteriaList } });
};

  const renderCriteriaInputs = () => {
    return criteriaList.map((criteria, index) => (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        
{/* 
        <TextField
          label="Points"
          type="number"
          variant="outlined"
          fullWidth
          value={criteria.points}
          onChange={(e) => updateCriteria(index, 'points', e.target.value)}
          style={{ marginBottom: '10px' }}
        /> */}
        <TextField
          label="Criteria Name"
          variant="outlined"
          fullWidth
          value={criteria.criteria}
          onChange={(e) => updateCriteria(index, 'criteria', e.target.value)}
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
      </Container>

    ));
  };

  return (
    <>

<div style={{ position: 'fixed', bottom: '50px', left: '50%', transform: 'translateX(-50%)', margin: '5px 0' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: '#8C1D40',
              color: 'white',
              '&:hover': {
                backgroundColor: '#a53f5d',
              },
              margin: '3px 0px',
            }}
           onClick={handleSaveButtonClick}
          >
            Save
          </Button>

          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: '#8C1D40',
              color: 'white',
              '&:hover': {
                backgroundColor: '#a53f5d',
              },
              margin: '3px 0px',
            }}
            onClick={addCriteria}
          >
            Add New Criteria
          </Button>

        </div>
      </div>
      {renderCriteriaInputs()}
      
    </> 
  );
}

export default ManualGradingCriteriaUpload;

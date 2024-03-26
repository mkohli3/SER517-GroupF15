import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import './ManualGradingCriteriaUpload.css';

function ManualGradingCriteriaUpload() {
  const [criteriaList, setCriteriaList] = useState([]);
  const navigate = useNavigate();

  const updateCriteria = (index, key, value) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[index][key] = value;
    setCriteriaList(updatedCriteriaList);
  };

  const addCriteria = () => {
    setCriteriaList([...criteriaList, { criteria: '', points: '', deductions: [] }]);
  };

  const addDeduction = (index) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[index].deductions.push({ points: '', comment: '' });
    setCriteriaList(updatedCriteriaList);
  };

  const removeDeduction = (criteriaIndex, deductionIndex) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[criteriaIndex].deductions.splice(deductionIndex, 1);
    setCriteriaList(updatedCriteriaList);
  };

  const handleSaveButtonClick = () => {
    navigate('/main-screen', { state: { criteriaList: criteriaList } });
  };

  const renderCriteriaInputs = () => {
    return criteriaList.map((criteria, index) => (
      <Container key={index} component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
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
          {criteria.deductions.map((deduction, deductionIndex) => (
            <div key={deductionIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TextField
                label={`Deduction ${deductionIndex + 1} Points`}
                type="number"
                variant="outlined"
                value={deduction.points}
                onChange={(e) => updateCriteria(index, `deductions[${deductionIndex}].points`, e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={`Deduction ${deductionIndex + 1} Comment`}
                variant="outlined"
                fullWidth
                value={deduction.comment}
                onChange={(e) => updateCriteria(index, `deductions[${deductionIndex}].comment`, e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <IconButton onClick={() => removeDeduction(index, deductionIndex)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button
            variant="contained"
            onClick={() => addDeduction(index)}
          >
            Add Deduction
          </Button>
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

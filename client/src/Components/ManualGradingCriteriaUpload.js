import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import './ManualGradingCriteriaUpload.css';

function ManualGradingCriteriaUpload() {
  const [criteriaList, setCriteriaList] = useState([]);
  const navigate = useNavigate();

  const updateCriteria = (criteriaIndex, key, value) => {
    setCriteriaList((prevList) =>
      prevList.map((criterion, i) => {
        if (i === criteriaIndex) {
          return { ...criterion, [key]: value };
        } else {
          return criterion;
        }
      })
    );
  };
  
  const updateDeductions = (criteriaIndex, deductionIndex, key, value) => {
    setCriteriaList((prevList) =>
      prevList.map((criterion, i) => {
        if (i === criteriaIndex) {
          return {
            ...criterion,
            deductions: criterion.deductions.map((deduction, j) =>
              j === deductionIndex ? { ...deduction, [key]: value } : deduction
            ),
          };
        } else {
          return criterion;
        }
      })
    );
  };
  



  const addCriteria = () => {
    setCriteriaList([
      ...criteriaList,
      { criteria: '', points: '', deductions: [] },
    ]);
  };

  const addDeduction = (criteriaIndex) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[criteriaIndex].deductions.push({ points: '', comment: '' });
    setCriteriaList(updatedCriteriaList);
  };
  



  const removeDeduction = (criteriaIndex, deductionIndex) => {
    const updatedCriteriaList = [...criteriaList];
    updatedCriteriaList[criteriaIndex].deductions.splice(deductionIndex, 1);
    setCriteriaList(updatedCriteriaList);
  };

  const handleSaveButtonClick = () => {
    console.log(criteriaList)
    navigate('/main-screen', { state: { criteriaList: criteriaList } });
  };

 

 
  


  const renderCriteriaInputs = () => {
    return criteriaList.map((criteria, criteriaIndex) => (
      <Container key={criteriaIndex} component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <TextField
            label="Criteria Name"
            variant="outlined"
            fullWidth
            value={criteria.criteria}
            onChange={(e) => updateCriteria(criteriaIndex, 'criteria', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Points"
            type="number"
            variant="outlined"
            fullWidth
            value={criteria.points}
            onChange={(e) => updateCriteria(criteriaIndex, 'points', e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          
          {criteria.deductions.map((deduction, deductionIndex) => (
            <div key={deductionIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              
              <TextField
                label={`Deduction ${deductionIndex + 1} Points`}
                type="number"
                variant="outlined"
                value={deduction.points}
                onChange={(e) => updateDeductions(criteriaIndex,deductionIndex, 'points', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label={`Deduction ${deductionIndex + 1} Comment`}
                variant="outlined"
                fullWidth
                value={deduction.comment}
                onChange={(e) => updateDeductions(criteriaIndex, deductionIndex, 'comment', e.target.value, deductionIndex)}
                style={{ marginBottom: '10px' }}
              />
              <IconButton onClick={() => removeDeduction(criteriaIndex, deductionIndex)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button
            variant="contained"
            onClick={() => addDeduction(criteriaIndex)}
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

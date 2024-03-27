import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
      <Container key={criteriaIndex} component="main"  className="criteria-container">
        <CssBaseline />
        
          <TextField
            label="Criteria Name"
            variant="outlined"
            fullWidth
            InputProps={{ style: { color: '#8C1D40', backgroundColor: 'goldenrod' } }} // Add color and background to the input
                InputLabelProps={{ style: { color: '#8C1D40' } }}
            value={criteria.criteria}
            onChange={(e) => updateCriteria(criteriaIndex, 'criteria', e.target.value)}
          />
          <TextField
            label="Points"
            type="number"
            variant="outlined"
            fullWidth
            InputProps={{ style: { color: '#8C1D40', backgroundColor: 'goldenrod' } }} // Add color and background to the input
                InputLabelProps={{ style: { color: '#8C1D40' } }}
            value={criteria.points}
            onChange={(e) => updateCriteria(criteriaIndex, 'points', e.target.value)}
          />
          
          {criteria.deductions.map((deduction, deductionIndex) => (
            <div key={deductionIndex} className="deduction-container">
              <TextField
                label={`Deduction ${deductionIndex + 1} Points`}
                type="number"
                variant="outlined"InputProps={{ style: { color: '#8C1D40', backgroundColor: 'goldenrod' } }} // Add color and background to the input
                InputLabelProps={{ style: { color: '#8C1D40' } }}
                
                value={deduction.points}
                onChange={(e) => updateDeductions(criteriaIndex,deductionIndex, 'points', e.target.value)}
              />
              <TextField
                label={`Deduction ${deductionIndex + 1} Comment`}
                variant="outlined"
                fullWidth
                InputProps={{ style: { color: '#8C1D40', backgroundColor: 'goldenrod' } }} // Add color and background to the input
                InputLabelProps={{ style: { color: '#8C1D40' } }}

                value={deduction.comment}
                onChange={(e) => updateDeductions(criteriaIndex, deductionIndex, 'comment', e.target.value, deductionIndex)}
              />
              <IconButton className="delete-icon" onClick={() => removeDeduction(criteriaIndex, deductionIndex)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <button className="add-deduction-button" onClick={() => addDeduction(criteriaIndex)}>Add Deduction</button>
      </Container>
    ));
  };

  return (
    <div className="manual-grading-criteria-upload">
      <div>


<div style={{ position: 'fixed', top:"0px", left: '50%', width:"100vw", transform: 'translateX(-50%)', zIndex: '9999', backgroundColor:"goldenrod" }}>
<h1 style={{  left: '0px',top:"0px", width: '100%', backgroundColor: '#8C1D40', color: 'goldenrod', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom:'0px', position:"relative", top:"-20px" }}>Add Grading Criteria Below</h1>
<div style={{display:"flex", justifyContent:"center"}}>
  <button onClick={handleSaveButtonClick}>Save</button>
  <button onClick={addCriteria}>Add New Criteria</button>
  </div>
</div>
</div>
    <div style={{ marginTop: '150px' }}>{renderCriteriaInputs()}</div>
    </div>
  );
}

export default ManualGradingCriteriaUpload;

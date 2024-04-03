import '../App.css';
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography, TextField, FormGroup, FormControlLabel, Checkbox, Paper } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ASULogo from '../utils/ASU_logo.png';

import './GradingCriteriaUpload.css'



function GradingCriteriaUpload() {

  const navigate = useNavigate();

const handleCSVButtonClick = () => { 
    navigate('/CSV-Upload-Page');
  };

const handleManualButtonClick = () => {   
    navigate('/Manual-Entry-Page');
};


  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <img src={ASULogo} alt="ASU Logo" style={{ height: '80px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5" style={{ fontSize: '24px', fontWeight: 'bold', color: '#800000'}}>
          Grading Tool
        </Typography>
          <>
            <Typography component="h2" variant="h6" style={{ fontSize: '18px', fontWeight: 'normal', color: '#800000'}}>
              Enter grading criteria below
            </Typography>
            
            <button type="button" className="button" fullWidth variant="contained" color="primary" onClick={handleCSVButtonClick}  
            >
              Upload Criteria CSV sheet
            </button>
      <Typography component="h" variant="h5" style={{ fontSize: '16px', fontWeight: 'bold', color: '#800000' }}>
              Or
            </Typography>
            <button type="button" className="button" fullWidth variant="contained" color="primary" onClick={handleManualButtonClick} 
            >
              Enter Grading Criteria Manually
            </button>
          </>
    
      
      </Paper>
    </Container>
  );
}

export default GradingCriteriaUpload;

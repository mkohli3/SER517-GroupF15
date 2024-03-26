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
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [criteriaList, setCriteriaList] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [displayedCsvData, setDisplayedCsvData] = useState(false);
  const [fileError, setFileError] = useState(""); 

const handleCSVButtonClick = () => { 
    navigate('/CSV-Upload-Page');
  };

const handleManualButtonClick = () => {   
    navigate('/Manual-Entry-Page');
};


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <img src={ASULogo} alt="ASU Logo" style={{ height: '80px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5" style={{ fontSize: '24px', fontWeight: 'bold', color: '#800000'}}>
          Grading Tool
        </Typography>
          <>
            <Typography component="h2" variant="h6" style={{ fontSize: '18px', fontWeight: 'normal', color: '#800000', marginBottom: '20px' }}>
              Enter grading criteria below
            </Typography>
            
            <button type="button" className="button" fullWidth variant="contained" color="primary" onClick={handleCSVButtonClick} style={{ margin: '10px 0' }}
            >
              Enter CSV sheet
            </button>
      <Typography component="h1" variant="h5" style={{ fontSize: '16px', fontWeight: 'bold', color: '#800000' }}>
              Or
            </Typography>
            <button type="button" className="button" fullWidth variant="contained" color="primary" onClick={handleManualButtonClick} style={{ margin: '10px 0' }}
            >
              Enter Grading Criteria Manually
            </button>
          </>
    
      
      </Paper>
    </Container>
  );
}

export default GradingCriteriaUpload;

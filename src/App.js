// App.js
import React, { useState } from 'react';
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import CSVReader from 'react-csv-reader';
import axios from 'axios';

import ASULogo from './ASU_logo.png'; // Import the image

function App() {
  const [csvData, setCsvData] = useState(null);

  const handleCsvUpload = (data) => {
    // Log the CSV data to the console (you can process it further if needed)
    console.log('CSV Data:', data);

    // Upload the CSV data to the database using an API
    axios.post('/api/upload-csv', { data })
      .then(response => {
        console.log('Upload successful:', response.data);
      })
      .catch(error => {
        console.error('Error uploading CSV:', error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px' }}>
        <img src={ASULogo} alt="ASU Logo" style={{ height: '80px', marginBottom: '20px' }} />
        <Typography component="h1" variant="h5"style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333',}}>
          Grading Tool
        </Typography>
        
        <Typography component="h1" variant="h5"style={{margin: '20px 0' ,fontSize: '1rem', fontWeight: 'bold', color: '#060606',}}>
          Enter grading criteria below
        </Typography>
        <CSVReader onFileLoaded={handleCsvUpload} />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: '5px 0' }}
        >
          Next
        </Button>
        <Typography component="h1" variant="h5"style={{fontSize: '2rem', fontWeight: 'bold', color: '#060606',}}>
          Or
        </Typography>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: '10px 0' }}
        >
          Enter Grading Criteria Manually
        </Button>
      </Paper>
    </Container>
  );
}

export default App;

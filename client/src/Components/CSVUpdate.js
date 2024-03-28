import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom'; 

const CSVUpdate = () => {
  const [criteriaList, setCriteriaList] = useState([]);
  const [fileName, setFileName] = useState('No file chosen'); 
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFileName('No file chosen'); 
      return;
    }

    setFileName(file.name); 

    Papa.parse(file, {
      complete: (result) => {
        const rows = result.data.slice(1);
        const transformedData = rows.map((row) => ({
          criteria: row[0] || '',
          points: row[1] || '',
          deductions: row.slice(2) || []
        }));
        setCriteriaList(transformedData);

        console.log(transformedData);
        
        if (fileInputRef.current) fileInputRef.current.value = ''; 
      },
      error: (error) => {
        console.error('Error parsing CSV: ', error);
        alert('An error occurred while parsing the file.');
      },
      header: false
    });
  };

  const handleStartGrading = () => {
    // Implement the navigation logic if necessary
    navigate('/main-screen', { state: { criteriaList } });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{
          margin: '20px 0',
          padding: '10px',
          borderColor: '#8C1D40', // ASU Maroon
          borderWidth: '2px',
          borderRadius: '5px',
          color: '#8C1D40',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#FFC627'; // ASU Gold
          e.target.style.color = '#FFFFFF';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#FFFFFF';
          e.target.style.color = '#8C1D40';
        }}
      />
      <label style={{ color: '#8C1D40', marginTop: '10px' }}>{fileName}</label> {/* Display the file name */}
      <button
        onClick={handleStartGrading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#8C1D40', // ASU Maroon
          color: '#FFFFFF',
          fontSize: '16px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#FFC627'} // ASU Gold on hover
        onMouseOut={(e) => e.target.style.backgroundColor = '#8C1D40'} // ASU Maroon
      >
        Start Grading
      </button>
    </div>
  );
};

export default CSVUpdate;

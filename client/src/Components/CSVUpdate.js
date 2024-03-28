import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { Button } from '@mui/material';
import './CSVUpdate.css';

// Helper function to convert array data back to CSV format
const arrayToCsv = (data) => {
  return data.map(row => row.join(',')).join('\n');
};

const EditableCell = ({ value, onChange }) => {
  return (
    <input
      type="text"
      defaultValue={value}
      onBlur={(e) => onChange(e.target.value)}
      style={{ width: "100%" }}
    />
  );
};

const CSVUpdate = () => {
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const fileInputRef = useRef(null); // Reference to the file input for reset

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return; // Early return if no file selected

    Papa.parse(file, {
      complete: (result) => {
        setHeaders(result.data[0]);
        setData(result.data.slice(1));
        // Reset the file input for re-upload
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      error: (error) => {
        console.error('Error parsing CSV: ', error);
        alert('An error occurred while parsing the file.');
      },
      header: false
    });
  };

  const updateCellValue = (rowIndex, columnIndex, newValue) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnIndex] = newValue;
    setData(updatedData);
  };

  const addNewRow = () => {
    setData([...data, new Array(headers.length).fill("")]);
  };

  const exportToCsv = () => {
    const csvString = arrayToCsv([headers, ...data]);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'updated_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'block', margin: '20px 0' }}
      />
      {headers.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <EditableCell
                        value={cell}
                        onChange={(newValue) => updateCellValue(rowIndex, cellIndex, newValue)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="Button Button-primary" onClick={addNewRow} style={{ margin: '10px' }}>
            Add Student
          </Button>
          <Button className="Button Button-secondary" onClick={exportToCsv} style={{ margin: '10px' }}>
            Export to CSV
          </Button>

        </>
      )}
    </div>
  );
};

export default CSVUpdate;


import './CSVTableDisplay.css'; 
// CSVTableDisplay.js
// CSVTableDisplay.js

import React from 'react';

const CSVTableDisplay = ({ headers, data }) => {
  if (!headers.length || !data.length) {
    return null; // Don't render if there are no headers or data
  }

  return (
    <div className="csv-table">
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
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVTableDisplay;

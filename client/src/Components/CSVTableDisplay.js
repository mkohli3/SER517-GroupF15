import React from 'react';
import './CSVTableDisplay.css';

const CSVTableDisplay = ({ headers, data }) => {
  if (!headers || !data || headers.length === 0 || data.length === 0) {
    return <div>No data to display</div>;
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

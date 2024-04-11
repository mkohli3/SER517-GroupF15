import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OpenExistingSheet = ({ onSheetSelect }) => {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetchGradingSheets();
  }, []);

  const fetchGradingSheets = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/grading-sheets`);
      setSheets(response.data);
    } catch (err) {
      console.error('Error fetching grading sheets:', err);
    }
  };

  const handleSheetSelect = (sheet) => {
    onSheetSelect(sheet);
  };

  return (
    <div>
      <h2>Open Existing Sheet</h2>
      {sheets.length === 0 ? (
        <p>No saved sheets found.</p>
      ) : (
        <ul>
          {sheets.map((sheet) => (
            <li key={sheet._id}>
              <button onClick={() => handleSheetSelect(sheet)}>{sheet.title}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpenExistingSheet;
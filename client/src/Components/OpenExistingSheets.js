import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OpenExistingSheet = ({ onSheetSelect, setShowOpenExistingSheet }) => {
  const [sheets, setSheets] = useState([]);
  const navigate = useNavigate();

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
    navigate('/main-screen', { state: {sheet, origin: 'openExistingSheet' }});

    //navigate('/main-screen', { state: { criteriaList, origin: 'manualUpload' } });
    setShowOpenExistingSheet(false);
  };

  const handleSheetDelete = async (sheetId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/grading-sheets/${sheetId}`);
      fetchGradingSheets(); // Refresh the list of sheets after deletion
    } catch (err) {
      console.error('Error deleting grading sheet:', err);
    }
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
              <button onClick={() => handleSheetDelete(sheet._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OpenExistingSheet;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Select, MenuItem } from '@mui/material';
import './MainScreen.css'; 

const MainScreen = () => {
  const [studentList, setStudentList] = useState([]);
  // State to track selected points by group
  const [selectedPoints, setSelectedPoints] = useState({});
  const locationState = useLocation().state;
  let criteriaList = locationState.criteriaList;

  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const StudentDetailsPopup = ({ isOpen, onClose, onAddDetails }) => {
    onAddDetails = ({ asuId, groupName }) => {
      const newStudent = {
        groupname: groupName,
        asuid: asuId,
      };
      setStudentList((prevList) => [...prevList, newStudent]);
    };
    const [asuId, setAsuId] = useState('');
    const [groupName, setGroupName] = useState('');

    const handleAddDetailsButton = () => {
      onAddDetails({ asuId, groupName });
      onClose();
    };

    return (
      isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Please Enter Student Details</h2>
            <div className="input-container">
              <label htmlFor="asuId">ASU ID:</label>
              <input
                type="text/number"
                id="asuId"
                placeholder="Enter ASU ID"
                value={asuId}
                onChange={(e) => setAsuId(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="groupName">Group Name:</label>
              <input
                type="text"
                id="groupName"
                placeholder="Enter Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <button onClick={handleAddDetailsButton}>Add to Details</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )
    );
  };

  const handleSaveButtonClick = () => {
    
    const studentsWithPoints = studentList.map((student) => {
      const points = selectedPoints[student.groupname] || {};
      return { ...student, points };
    });
    console.log('Data to save:', studentsWithPoints);
    
  };

  // Implementing the function to handle exporting data to CSV
 
  const handleExportButtonClick = () => {
    
    const dataToExport = studentList.map((student) => {
      const points = selectedPoints[student.groupname] || {};
      return { ...student, points };
    });
    console.log('Data to export:', dataToExport);
   
  };

  const handleStudentDetailsButtonClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handlePointChange = (groupName, criteria, value) => {
    setSelectedPoints((prevPoints) => ({
      ...prevPoints,
      [groupName]: {
        ...prevPoints[groupName],
        [criteria]: value,
      },
    }));
  };

  return (
    <div>
      <Typography component="h2" variant="h5" className="asu-typography center-text">
        Grading Criteria Display
      </Typography>
      <table className="main-screen-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>ASU Id</th>
            {criteriaList.map((criteria, index) => (
              <th key={index}>{criteria.criteria}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentList &&
            studentList.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>{student.groupname}</td>
                <td>{student.asuid}</td>
                {criteriaList.map((criteria, criteriaIndex) => (
                  <td key={criteriaIndex}>
                    <Select
                      value={(selectedPoints[student.groupname] && selectedPoints[student.groupname][criteria.criteria]) || ''}
                      onChange={(e) => handlePointChange(student.groupname, criteria.criteria, e.target.value)}
                    >
                      {[...Array(criteria.points + 1).keys()].map((point) => (
                        <MenuItem key={point} value={point}>
                          {point}
                        </MenuItem>
                      ))}
                    </Select>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <div style={{ position: 'fixed', bottom: '50px', left: '50%', transform: 'translateX(-50%)', margin: '5px 0' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: '#8C1D40',
              color: 'white',
              '&:hover': {
                backgroundColor: '#a53f5d',
              },
              margin: '3px 0px',
            }}
            onClick={handleSaveButtonClick}
          >
            Save
          </Button>

          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: '#8C1D40',
              color: 'white',
              '&:hover': {
                backgroundColor: '#a53f5d',
              },
              margin: '3px 0px',
            }}
            onClick={handleStudentDetailsButtonClick}
          >
            Add Student Details
          </Button>

          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: '#8C1D40',
              color: 'white',
              '&:hover': {
                backgroundColor: '#a53f5d',
              },
              margin: '3px 0px',
            }}
            onClick={handleExportButtonClick}
          >
            Export CSV
          </Button>
        </div>
      </div>

      <StudentDetailsPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default MainScreen;

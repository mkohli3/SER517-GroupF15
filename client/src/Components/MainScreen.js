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
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
const [editingCriteriaIndex, setEditingCriteriaIndex] = useState(null);

const handleEditButtonClick = (index) => {
  setEditingCriteriaIndex(index);
  setEditPopupOpen(true);
};

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
  const EditCriteriaPopup = ({ isOpen, onClose, criteriaIndex, criteriaList, onSave }) => {
    const [editedCriteria, setEditedCriteria] = useState({ ...criteriaList[criteriaIndex] });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedCriteria((prevCriteria) => ({
        ...prevCriteria,
        [name]: value,
      }));
    };
  
    const handleSave = () => {
      onSave(editedCriteria);
    };
  
    return (
      isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Comments</h2>
            <div className="input-container">
              <label htmlFor="criteriaPoints">Points:</label>
              <input
                type="number"
                id="criteriaPoints"
                name="points"
                value={editedCriteria.points}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
            <label htmlFor="criteriaComments">Comments:</label>
            <textarea
              id="criteriaComments"
              name="comments"
              value={editedCriteria.comments}
              onChange={handleInputChange}
              rows={4}
              cols={50}
            />
          </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      )
    );
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
      <React.Fragment key={index}>
        <th>{criteria.criteria}
        
          <button 
            onClick={() =>  handleEditButtonClick(index)}
          >
            Edit
          </button>
        </th>
        </React.Fragment>
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
          <button
            onClick={handleSaveButtonClick}
          >
            Save
          </button>

          <button
            onClick={handleStudentDetailsButtonClick}
          >
            Add Student Details
          </button>

          <button
            onClick={handleExportButtonClick}
          >
            Export CSV
          </button>
        </div>
      </div>
      {isEditPopupOpen && (
  <EditCriteriaPopup
    isOpen={isEditPopupOpen}
    onClose={() => setEditPopupOpen(false)}
    criteriaIndex={editingCriteriaIndex}
    criteriaList={criteriaList}
    onSave={(editedCriteria) => {
      // Handle saving the edited criteria
      console.log("Edited criteria:", editedCriteria);
      setEditPopupOpen(false);
    }}
  />
)}
      <StudentDetailsPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default MainScreen;

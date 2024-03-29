import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Select, MenuItem } from '@mui/material';
import { saveAs } from 'file-saver';
import './MainScreen.css'; 

const MainScreen = () => {
  const [studentList, setStudentList] = useState([]);
  const [selectedPoints, setSelectedPoints] = useState({});
  const [selectedComments, setSelectedComments] = useState({});
  const locationState = useLocation().state || {}; 
  let criteriaList = locationState.criteriaList || [];
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
            <label htmlFor="csv-upload" className="asu-button">Upload Students</label>

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
      const comments = selectedComments[student.groupname] || {};
      return { ...student, points, comments };
    });
    
  };

  const handleExportButtonClick = () => {
    const dataToExport = studentList.map((student) => {
      const points = selectedPoints[student.groupname] || {};
      const comments = selectedComments[student.groupname] || {};
      return { ...student, points, comments };
    });

    const csvData = convertToCSV(dataToExport);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'studentDetails.csv');
  };

  const convertToCSV = (objArray) => {
    const array = Array.isArray(objArray) ? objArray : [objArray];
    let str = '';
  

    const keys = new Set();
    array.forEach((obj) => {
      Object.keys(obj).forEach((key) => keys.add(key));
    });
  

    const headers = Array.from(keys).join(',') + '\r\n';
    str += headers;
  

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const key of keys) {
        if (line !== '') line += ',';
  
        const value = array[i][key];
        if (value !== undefined && typeof value === 'object') {
          line += JSON.stringify(value);
        } else {
          line += value !== undefined ? value : 'null';
        }
      }
  
      str += line + '\r\n';
    }
  
    return str;
  };
  const handleStudentDetailsButtonClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handlePointChange = (groupName, asuID, criteria, value) => {
    const totalPoints = parseInt(criteriaList.find(c => c.criteria === criteria)?.points);
    const deduction = totalPoints - parseInt(value);
  
    // Find the deduction corresponding to the calculated deduction for the specific criterion
    const deductionPoints = criteriaList.find(c => c.criteria === criteria)?.deductions || [];
    
    const selectedDeduction = deductionPoints.find(d => parseInt(d.points) === parseInt(deduction)) || null;
    
    // Update comments based on the calculated deduction for the specific criterion
    const comment = selectedDeduction ? selectedDeduction.comment : "No comment";
    
    setSelectedPoints(prevPoints => {
      const updatedPoints = { ...prevPoints };
      if (!updatedPoints[groupName]) {
        updatedPoints[groupName] = {};
      }
      if (!updatedPoints[groupName][asuID]) {
        updatedPoints[groupName][asuID] = {};
      }
      updatedPoints[groupName][asuID][criteria] = value;
      return updatedPoints;
    });
  
    setSelectedComments(prevComments => {
      const updatedComments = { ...prevComments };
      if (!updatedComments[groupName]) {
        updatedComments[groupName] = {};
      }
      if (!updatedComments[groupName][asuID]) {
        updatedComments[groupName][asuID] = {};
      }
      updatedComments[groupName][asuID][criteria] = comment;
      return updatedComments;
    });

    
  };
  
  const handleUploadCSV = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target.result;
      const lines = result.split('\n').map(line => line.split(','));
      const students = lines.slice(1).map(line => ({ groupname: line[0], asuid: line[1] }));
      setStudentList(students);
    };

    reader.readAsText(file);
  };




  const EditCriteriaPopup = ({ isOpen, onClose, criteriaIndex, criteriaList, onSave }) => {
    const [editedCriteria, setEditedCriteria] = useState({ ...criteriaList[criteriaIndex] });
    const [criteriaTypeColor, setCriteriaTypeColor] = useState('#000');
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'type') {
        // Set the color based on the selected criteria type
        setCriteriaTypeColor(value === 'Group' ? '#FFD700' : '#FFD700');
      }
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
              <label htmlFor="criteriaName">Criteria Name:</label>
              <input
                id="criteriaName"
                name="criteria"
                value={editedCriteria.criteria}
                onChange={handleInputChange}
              />
            </div>
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
            <div className="input-container">
              <label htmlFor="criteriaType">Criteria Type:</label>
              <Select
                id="criteriaType"
                name="type"
                value={editedCriteria.type}
                onChange={handleInputChange}
                style={{ color: criteriaTypeColor, fontWeight: 'bold', border: '1px solid #8C1D40' }}
              >
                <MenuItem value="group">Group</MenuItem>
                <MenuItem value="individual">Individual</MenuItem>
              </Select>
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
              <th key={index}>
                {criteria.criteria}
                <button onClick={() => handleEditButtonClick(index)}>Edit</button>
              </th>
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
value={(selectedPoints[student.groupname] && selectedPoints[student.groupname][student.asuId] && selectedPoints[student.groupname][student.asuId][criteria.criteria]) || ''}
onChange={(e) => handlePointChange(student.groupname, student.asuId, criteria.criteria, e.target.value)}
>

  {[...Array(parseInt(criteria.points) + 1).keys()].map((point) => (
    <MenuItem key={point} value={point}>
      {point}
    </MenuItem>
  ))}
</Select>

<div>
{selectedComments[student.groupname]?.[student.asuId]?.[criteria.criteria] || "No comments"}
</div>

                  </td>
                ))}
                    </tr>
            ))}
        </tbody>
      </table>

      <div style={{ position: 'fixed', bottom: '50px', left: '50%', transform: 'translateX(-50%)', margin: '5px 0' }}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={handleSaveButtonClick}>Save</button>
          <button onClick={handleStudentDetailsButtonClick}>Add Student Details</button>
          <input type="file" accept=".csv" id="csv-upload" onChange={handleUploadCSV} style={{ display: 'none' }} />
          <button onClick={handleExportButtonClick}>Export CSV</button>
        </div>
      </div>

      {isEditPopupOpen && (
        <EditCriteriaPopup
          isOpen={isEditPopupOpen}
          onClose={() => setEditPopupOpen(false)}
          criteriaIndex={editingCriteriaIndex}
          criteriaList={criteriaList}
          onSave={(editedCriteria) => {
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

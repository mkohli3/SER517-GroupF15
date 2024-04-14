import React, { useState } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { Button, Typography, Select, MenuItem } from '@mui/material';
  import { saveAs } from 'file-saver';
  import './MainScreen.css'; 
  import { IconButton, TextField  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './MainScreen.css';
import axios from 'axios';

const MainScreen = () => {
  const locationState = useLocation().state || {};

  const [studentList, setStudentList] = useState(locationState.students || []);
  const [selectedPoints, setSelectedPoints] = useState(
    locationState.students?.reduce((acc, student) => {
      acc[student.groupname] = student.points;
      return acc;
    }, {}) || {}
  );
  const [selectedComments, setSelectedComments] = useState(
    locationState.students?.reduce((acc, student) => {
      acc[student.groupname] = student.comments;
      return acc;
    }, {}) || {}
  );
  
  const criteriaList = locationState.gradingCriteria || [];
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingCriteriaIndex, setEditingCriteriaIndex] = useState(null);
  const [newComments, setNewComments] = useState({});

  const handleEditButtonClick = (index) => {
    setEditingCriteriaIndex(index);
    setEditPopupOpen(true);
  };

  const handleNewCommentChange = (asuId, value) => {
    setNewComments(prevComments => ({
      ...prevComments,
      [asuId]: value
    }));
  };
  
    
    
    const handleGroupNameEditButtonClick = (studentIndex) => {
      const studentToUpdate = studentList[studentIndex];
      const newGroupName = prompt('Enter new Group Name:', studentToUpdate.groupname);
      if (newGroupName !== null && newGroupName !== '') {
        const updatedStudentList = [...studentList];
        updatedStudentList[studentIndex] = { ...studentToUpdate, groupname: newGroupName };
        setStudentList(updatedStudentList);
      }
    };
    const handleASUIDEditButtonClick = (studentIndex) => {
      // Open a popup or perform any action to edit the ASU ID of the selected student
      const studentToUpdate = studentList[studentIndex];
      const newASUID = prompt('Enter new ASU ID:', studentToUpdate.asuid);
      if (newASUID !== null && newASUID !== '') {
        // Update the ASU ID of the selected student
        const updatedStudentList = [...studentList];
        updatedStudentList[studentIndex] = { ...studentToUpdate, asuid: newASUID };
        setStudentList(updatedStudentList);
      }
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
    const handleSaveButtonClick = async () => {
      const studentsWithPoints = studentList.map((student) => {
        const points = selectedPoints[student.groupname] || {};
        const comments = selectedComments[student.groupname] || {};
        return { ...student, points, comments };
      });
    
      try {
        let title = studentList[0]?.groupname || 'Untitled';
        
        if (!title || title.trim() === '') {
          title = 'Untitled'; 
        }
    
        const requestData = {
          title: title,
          gradingCriteria: criteriaList.map((criteria) => ({
            criteriaName: criteria.criteria,
            points: criteria.points,
            criteriaType: criteria.type.toLowerCase(),
          })),
          students: studentsWithPoints,
        };
    
        if (locationState && locationState._id) {
          requestData.id = locationState._id;
        }
    
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/grading-sheets/update-criteria`, requestData);
        console.log('Grading sheet updated:', response.data);
        toast.success('Data saved successfully!');
      } catch (error) {
        console.error('Failed to save grading sheet:', error?.response?.data ? error.response.data : 'Unknown error');
        toast.error('Failed to save data. ' + (error?.response?.data ? error.response.data : 'Please check your network or contact support.'));
      }
    };
    const handleExportButtonClick = () => {
      const dataToExport = studentList.map((student) => {
        const points = selectedPoints[student.groupname] || {};
        const comments = selectedComments[student.groupname] || {};
    
        const flattenedData = {};
    
        criteriaList.forEach((criteria) => {
          const criteriaPoints = points[student.asuId]?.[criteria.criteria] || 0; // Corrected asuId reference
          const criteriaComment = comments[student.asuId]?.[criteria.criteria] || "";
    
          flattenedData[`${criteria.criteria}_points`] = criteriaPoints;
          flattenedData[`${criteria.criteria}_comment`] = criteriaComment;
        });
    
        const totalPoints = getTotalPoints(student.groupname);
    
        return { ...student, ...flattenedData, totalPoints };
      });
    
      const csvData = convertToCSV(dataToExport);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'studentDetails.csv');
    
      toast.success('CSV exported successfully!');
    };
    
    // Function to calculate total points for a student group
    const getTotalPoints = (groupName) => {
      let totalPoints = 0;
      const points = selectedPoints[groupName] || {};
      for (const studentId in points) {
        for (const criteria in points[studentId]) {
          totalPoints += parseInt(points[studentId][criteria]);
        }
      }
      return totalPoints;
    };
    

    const convertToCSV = (objArray) => {
      const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
  
  
      const headers = Object.keys(array[0]).join(',') + '\r\n';
      str += headers;
  
  
      for (let i = 0; i < array.length; i++) {
        let line = '';
        for (const index in array[i]) {
          if (line !== '') line += ',';
  
          line += array[i][index];
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
        updatedPoints[groupName][asuID][criteria] = parseInt(value); // Ensure it's an integer
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
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCriteria((prevCriteria) => ({
          ...prevCriteria,
          [name]: value,
        }));
      };
    
      const handleDeductionChange = (index, key, value) => {
        const updatedDeductions = [...editedCriteria.deductions];
        updatedDeductions[index] = { ...updatedDeductions[index], [key]: value };
        setEditedCriteria((prevCriteria) => ({
          ...prevCriteria,
          deductions: updatedDeductions,
        }));
      };
    
      const addDeduction = () => {
        setEditedCriteria((prevCriteria) => ({
          ...prevCriteria,
          deductions: [...prevCriteria.deductions, { points: '', comment: '' }],
        }));
      };
    
      const removeDeduction = (index) => {
        setEditedCriteria((prevCriteria) => ({
          ...prevCriteria,
          deductions: prevCriteria.deductions.filter((_, i) => i !== index),
        }));
      };
    
      const handleSave = () => {

        criteriaList[criteriaIndex] = editedCriteria;
        onClose();
       
      };
    
      return (
        isOpen && (
          <div className="popup">
            <div className="popup-content">
              <h2>Edit Criteria</h2>
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
                <label htmlFor="criteriaType">Criteria Type:</label>
                <Select
                  id="criteriaType"
                  name="type"
                  value={editedCriteria.type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Group">Group</MenuItem>
                  <MenuItem value="Individual">Individual</MenuItem>
                </Select>
              </div>
              <div className="deductions-container">
                <h3>Deductions:</h3>
                {editedCriteria.deductions.map((deduction, index) => (
                  <div key={index} className="deduction">
                    <TextField
                      label={`Deduction ${index + 1} Points`}
                      type="number"
                      value={deduction.points}
                      onChange={(e) => handleDeductionChange(index, 'points', e.target.value)}
                    />
                    <TextField
                      label={`Deduction ${index + 1} Comment`}
                      value={deduction.comment}
                      onChange={(e) => handleDeductionChange(index, 'comment', e.target.value)}
                    />
                    <IconButton onClick={() => removeDeduction(index)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ))}
                <button onClick={addDeduction}>Add Deduction</button>
              </div>
              <button onClick={handleSave} variant="contained" >Save</button>
              <button onClick={onClose} variant="contained" >Cancel</button>
            </div>
          </div>
        )
      );
    };
  
    
    return (
      <div>
        <ToastContainer />

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
                {criteria.criteria} ({criteria.points})
                <IconButton onClick={() => handleEditButtonClick(index)}>
                  <EditIcon />
                </IconButton>
              </th>
              
            
                
              ))}
              <th>Comments</th>
              <th>Total Points </th>
            </tr>
          </thead>
          <tbody>
            {studentList &&
              // Inside the table body rendering logic
studentList.map((student, studentIndex) => {
  // Calculate total points for each student
  let totalPoints = 0; // Initialize total points for the student
  return (
    <tr key={studentIndex}>
    <td>
  {student.groupname}
  <IconButton onClick={() => handleGroupNameEditButtonClick(studentIndex)}><EditIcon /></IconButton>
</td>
      <td>
  {student.asuid}
  <IconButton onClick={() => handleASUIDEditButtonClick(studentIndex)}><EditIcon /></IconButton>
</td>
      
      {criteriaList.map((criteria, criteriaIndex) => {
        const points = (selectedPoints[student.groupname] && selectedPoints[student.groupname][student.asuId] && selectedPoints[student.groupname][student.asuId][criteria.criteria]) || criteria.points;
        let criteriaPoint = criteria.points - points;
        totalPoints += parseInt(criteriaPoint);
        return (
          <td key={criteriaIndex}>
            <Select
              value={points}
              onChange={(e) => handlePointChange(student.groupname, student.asuId, criteria.criteria, e.target.value)}
  
            >
              {criteria.deductions.map((deduction, index) => (
              <MenuItem key={index} value={deduction.points}>
                  {`-${deduction.points} : ${deduction.comment}`}
              </MenuItem>
            ))}
           
            </Select>
          </td>
          
          
        );
      })}
      <td className="NewComments">
  <TextField
    label="New Comment"
    value={newComments[student.asuid] || ''}
    onChange={(e) => handleNewCommentChange(student.asuid, e.target.value)}
  />
</td>


     <td>{totalPoints}</td> 
    </tr>
  );
})}

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
              setEditPopupOpen(false);
            }}
          />
        )}
        <StudentDetailsPopup isOpen={isPopupOpen} onClose={closePopup} />
      </div>
      
    );
  };

  export default MainScreen;
import React, { useState }  from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './MainScreen.css'; // Ensure this is imported
import GradingCriteriaUpload from './GradingCriteriaUpload';

const StudentDetailsPopup = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="popup">
        <div className="popup-content">
  <h2>Please Enter Student Details</h2>
  
  <div className="input-container">
    <label htmlFor="asuId">ASU ID:</label>
    <input type="number" id="asuId" placeholder="Enter ASU ID" />
  </div>

  <div className="input-container">
    <label htmlFor="groupName">Group Name:</label>
    <input type="text" id="groupName" placeholder="Enter Group Name" />
  </div>
  <button onClick={onClose}>Add to Details</button>
  <button onClick={onClose}>Close</button>
</div>
      </div>
    )
  );
};



const MainScreen = () => {
  const criteriaList = useLocation().state.criteriaList;
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleBackButtonClick = () => {
    navigate('/new' );
};
const handleStudentDetailsButtonClick = () => {
  setPopupOpen(true);
};

const closePopup = () => {
  setPopupOpen(false);
};

  return (
    <div>
      <Typography component="h2" variant="h5" className="asu-typography center-text">Grading Criteria Display</Typography>
      <table className="main-screen-table">
        <thead>
          <tr>
          <th>Group Name</th>
            <th>ASU Id</th>
            <th>Criteria Name</th>
            <th>Points</th>
            <th>Group Criteria</th>
            <th>Individual Criteria</th>
          </tr>
        </thead>
        <tbody>
          {criteriaList &&
            criteriaList.map((criteria, index) => (
              <tr key={index}>
                <td>{criteria.groupname}</td>
                <td>{criteria.asuid}</td> 
                <td>{criteria.criteria}</td>
                <td>{criteria.points}</td>
                <td>{criteria.group ? 'Yes' : 'No'}</td>
                <td>{criteria.individual ? 'Yes' : 'No'}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div style={{ position: 'fixed', bottom: '50px', left: '50%', transform: 'translateX(-50%)', margin: '5px 0' }}>
        <Typography component="h2" variant="h6" style={{ fontSize: '18px', fontWeight: 'normal', color: '#800000' }} className="asu-typography">
          Enter Student Details Next
        </Typography>
        <div style={{ display: 'flex', gap: '5px' }}>  
        <Button
          type="button" fullWidth
         variant="contained"
          // Utilize the sx prop for custom styles
          sx={{
            backgroundColor: '#8C1D40', // ASU Maroon
            color: 'white',
            '&:hover': {
              backgroundColor: '#a53f5d', // A lighter maroon for hover effect
            },
            margin: '5px 0px',
          }}
          onClick={handleBackButtonClick}
        >
          Back
        </Button>

        <Button
          type="button" fullWidth
         variant="contained"
          // Utilize the sx prop for custom styles
          sx={{
            backgroundColor: '#8C1D40', // ASU Maroon
            color: 'white',
            '&:hover': {
              backgroundColor: '#a53f5d', // A lighter maroon for hover effect
            },
            margin: '5px 0px',
          }}
          onClick={handleStudentDetailsButtonClick}
        >
          Add Student Details
        </Button>
      </div>
      </div>
      {/* Include the StudentDetailsPopup component here */}
      <StudentDetailsPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default MainScreen;

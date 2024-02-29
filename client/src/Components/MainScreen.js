import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './MainScreen.css'; // Ensure this is imported
import GradingCriteriaUpload from './GradingCriteriaUpload';



const MainScreen = () => {
  const criteriaList = useLocation().state.criteriaList;
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/new' );
    
  
};

  return (
    <div>
      <Typography component="h2" variant="h5" className="asu-typography center-text">Grading Criteria Display</Typography>
      <table className="main-screen-table">
        <thead>
          <tr>
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
        >
          Next
        </Button>
      </div>
      </div>
    </div>
  );
};

export default MainScreen;

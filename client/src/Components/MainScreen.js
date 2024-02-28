import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import './MainScreen.css'; // Ensure this is imported

const MainScreen = () => {
  const criteriaList = useLocation().state.criteriaList;

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
        <Typography component="h2" variant="h6" style={{ fontSize: '18px', fontWeight: 'normal', color: '#800000' }} className="asu-typography center-text">
          Enter Student Details Next
        </Typography>

        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          // onClick={handleNextButtonClick}
          className="asu-button"
          style={{ margin: '5px 0' }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MainScreen;

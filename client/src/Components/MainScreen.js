import React from 'react';
import {useLocation} from 'react-router-dom';

const MainScreen = ( ) => {

    const criteriaList = useLocation().state.criteriaList;

  return (
    <div>
      <h2>Grading Criteria Display</h2>
      <div>
        {/* Display the grading criteria in a row */}
        {criteriaList && criteriaList.map((criteria, index) => (
          <div key={index}>
            <p>Criteria Name: {criteria.criteria}</p>
            <p>Points: {criteria.points}</p>
            <p>Group Criteria: {criteria.group ? 'Yes' : 'No'}</p>
            <p>Individual Criteria: {criteria.individual ? 'Yes' : 'No'}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainScreen;

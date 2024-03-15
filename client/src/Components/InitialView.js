import React from 'react';
import { useNavigate } from 'react-router-dom';

const InitialView = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to the Grading System</h1>
            <button onClick={() => navigate('/grader-login')}>Grader View</button>
            <button disabled>Student View (Coming Soon)</button>
        </div>
    );
};

export default InitialView;

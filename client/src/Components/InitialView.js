import React from 'react';
import { useNavigate } from 'react-router-dom';
import ASULogo from '../utils/ASU_logo.png';
import './InitialView.css';

const InitialView = () => {
    const navigate = useNavigate();

    return (
        <div className="initial-view">
            <img src={ASULogo} alt='ASU Logo' />
            <h1>Welcome to the Grading System</h1>
            <button onClick={() => navigate('/grader-login')}>Grader View</button>
            <button disabled>Student View (Coming Soon)</button>
        </div>
    );
};

export default InitialView;

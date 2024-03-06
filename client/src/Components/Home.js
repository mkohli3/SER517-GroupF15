import React from 'react';
import './Home.css';
import ASULogo from '../utils/ASU_logo.png';
import { useNavigate } from 'react-router-dom';
import App from '../App';
export const Home = () => {
    const navigate = useNavigate();

    const handleExistingSheet = () => {
        navigate('/grading-criteria-upload');
    };

    const handleNewSheet = () => {
        navigate('/manual-entry');
    };

    return (
        <div className="home">
            <img src={ASULogo} alt='ASU-LOGO' />
            <button type='button' onClick={handleExistingSheet}>Open existing sheet</button>
            <button type='button' onClick={handleNewSheet}>Create a new sheet</button>
        </div>
    );
};
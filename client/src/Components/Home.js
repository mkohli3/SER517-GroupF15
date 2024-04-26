import './Home.css';
import React, { useState } from 'react';
import ASULogo from '../utils/ASU_logo.png';
import { useNavigate } from 'react-router-dom';
import OpenExistingSheet from './OpenExistingSheets.js';
export const Home = () => {
    const navigate = useNavigate();
    const [showOpenExistingSheet, setShowOpenExistingSheet] = useState(false);
  
    const handleExistingSheet = () => {
      setShowOpenExistingSheet(true);
    };
    const handleNewSheet = () =>
    {
    // Navigate to the "/new" route when creating a new sheet
    navigate('/new');
    };
    const handleSheetSelect = (sheet) => {
        navigate('/main-screen', { state: sheet });
        setShowOpenExistingSheet(false);
      };
      return (
        <div className="home">
          <img src={ASULogo} alt="ASU-LOGO" />
          <button type="button" onClick={handleExistingSheet}>
            Open existing sheet
          </button>
          <button type="button" onClick={handleNewSheet}>
            Create a new sheet
          </button>
          {showOpenExistingSheet && (
        <OpenExistingSheet
          onSheetSelect={handleSheetSelect}
          setShowOpenExistingSheet={setShowOpenExistingSheet}
        />
      )}
        </div>
      );
    };
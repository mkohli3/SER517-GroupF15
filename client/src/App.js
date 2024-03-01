import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import ManualEntry from './Components/ManualEntry';
import { Home } from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GradingCriteriaUpload />} />
        // Added a new route for home page
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

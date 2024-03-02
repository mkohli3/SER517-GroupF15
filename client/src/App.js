import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import ManualEntry from './Components/ManualEntry';
import { Home } from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grading-criteria-upload" element={<GradingCriteriaUpload />} />
        <Route path="/manual-entry" element={<ManualEntry />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import { Home } from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new" element={<GradingCriteriaUpload />} />
        // Added a new route for GradingCriteriaUpload
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

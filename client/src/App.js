import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import { Home } from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new" element={<GradingCriteriaUpload />} />
        // Updated route for new grading criteria upload
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

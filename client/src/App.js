import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GradingCriteriaUpload />} />
      </Routes>
    </Router>
  );
}

export default App;

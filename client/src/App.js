import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import { Home } from './Components/Home';
import MainScreen from './Components/MainScreen';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path='/' element={<Home />} />
        <Route path="/new" element={<GradingCriteriaUpload />} />
        <Route path="/main-screen" element={<MainScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;

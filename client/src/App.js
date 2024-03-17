import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import { Home } from './Components/Home';
import MainScreen from './Components/MainScreen';
import GraderLogin from './Components/Graderlogin';
import InitialView from './Components/InitialView';
function App() {
  return (
    <Router>
      <Routes>
       
        <Route path='/' element={<InitialView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new" element={<GradingCriteriaUpload />} />
        <Route path="/main-screen" element={<MainScreen/>} />
        <Route path="/grader-login" element={<GraderLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

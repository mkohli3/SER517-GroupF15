import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GradingCriteriaUpload from './Components/GradingCriteriaUpload';
import { Home } from './Components/Home';
import MainScreen from './Components/MainScreen';
import GraderLogin from './Components/Graderlogin';
import InitialView from './Components/InitialView';
import CSVUpdate from './Components/CSVUpdate';
import ManualGradingCriteriaUpload from './Components/ManualGradingCriteriaUpload';
import CSVTableDisplay from './Components/CSVTableDisplay';
function App() {
  return (
    <Router>
      <Routes>
       
        <Route path='/' element={<InitialView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new" element={<GradingCriteriaUpload />} />
        <Route path="/main-screen" element={<MainScreen/>} />
        <Route path="/Manual-Entry-Page" element={<ManualGradingCriteriaUpload/>} />
        <Route path="/CSV-Upload-Page" element={<CSVUpdate/>} />
        <Route path="/CSV-Display-Page" element={<CSVTableDisplay/>} />
        <Route path="/grader-login" element={<GraderLogin />} />

      </Routes>
    </Router>
  );
}

export default App;

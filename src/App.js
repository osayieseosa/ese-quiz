// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NameInputForm from './NameInput';
import SpinningWheel from './GamePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nameInput" element={<NameInputForm/>} />
        <Route path="/gamePage" element={<SpinningWheel/>} />
      </Routes>
    </Router>
  );
}

export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Callback from './components/Callback';
console.log(process.env.REACT_APP_CLIENT_ID);


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;

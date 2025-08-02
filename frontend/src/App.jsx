import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import VehicleList from './components/VehicleList.jsx';

/**
 * Root component handling routes.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vehicles" element={<VehicleList />} />
      </Routes>
    </Router>
  );
}

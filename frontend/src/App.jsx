import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import Login from './components/Login.jsx';
import VehicleList from './components/VehicleList.jsx';

/**
 * Root component handling application routes including the landing page.
*/
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vehicles" element={<VehicleList />} />
      </Routes>
    </Router>
  );
}

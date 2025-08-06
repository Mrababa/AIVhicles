import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminPlaceholder from './components/AdminPlaceholder.jsx';
import Logout from './components/Logout.jsx';
import VehicleList from './components/VehicleList.jsx';
import VehicleCatalog from './components/VehicleCatalog.jsx';
import About from './components/About.tsx';
import FAQ from './components/FAQ.tsx';
import Contact from './components/Contact.tsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

import AIVehicleInspector from './components/AIVehicleInspector.jsx';


/**
 * Root component handling application routes including the landing page.
*/
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminPlaceholder title="Users Management" />} />
          <Route path="/admin/catalog" element={<AdminPlaceholder title="Catalog Management" />} />
          <Route path="/admin/services" element={<AdminPlaceholder title="Services Control" />} />
          <Route path="/admin/logs" element={<AdminPlaceholder title="Logs & Audits" />} />
          <Route path="/admin/plans" element={<AdminPlaceholder title="Plans & Pricing" />} />
          <Route path="/admin/profile" element={<AdminPlaceholder title="My Profile" />} />
          <Route path="/admin/settings" element={<AdminPlaceholder title="System Settings" />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/catalog" element={<VehicleCatalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/inspector" element={<AIVehicleInspector />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}


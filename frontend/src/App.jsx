import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AdminPlans from './components/AdminPlans.jsx';
import AdminContent from './components/AdminContent.jsx';
import AdminLayout from './components/AdminLayout.tsx';
import AdminUsers from './components/AdminUsers.jsx';
import AdminRoles from './components/AdminRoles.jsx';
import AdminPlaceholder from './components/AdminPlaceholder.jsx';
import AdminClients from './components/AdminClients.tsx';
import Logout from './components/Logout.jsx';
import VehicleSpecsDashboard from './components/VehicleSpecsDashboard.jsx';
import VehicleSpecForm from './components/VehicleSpecForm.jsx';
import VehicleList from './components/VehicleList.jsx';
import VehicleCatalog from './components/VehicleCatalog.jsx';
import AboutUsPage from './components/AboutUsPage.tsx';
import FAQ from './components/FAQ.tsx';
import Contact from './components/Contact.tsx';
import PricingPage from './components/PricingPage.tsx';
import ServicesPage from './components/ServicesPage.tsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ContentProvider } from './contexts/ContentContext.tsx';

import AIVehicleInspector from './components/AIVehicleInspector.jsx';
import VinDecoderPage from './components/VinDecoderPage.tsx';


/**
 * Root component handling application routes including the landing page.
*/
export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="roles" element={<AdminRoles />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="catalog" element={<AdminPlaceholder title="Catalog Management" />} />
              <Route path="services" element={<AdminPlaceholder title="Services Control" />} />
              <Route path="logs" element={<AdminPlaceholder title="Logs & Audits" />} />
              <Route path="plans" element={<AdminPlans />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="specs" element={<VehicleSpecsDashboard />} />
              <Route path="specs/add" element={<VehicleSpecForm />} />
              <Route path="specs/edit/:id" element={<VehicleSpecForm />} />
              <Route path="profile" element={<AdminPlaceholder title="My Profile" />} />
              <Route path="settings" element={<AdminPlaceholder title="System Settings" />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/catalog" element={<VehicleCatalog />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/vin-decoder" element={<VinDecoderPage />} />
            <Route path="/inspector" element={<AIVehicleInspector />} />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}


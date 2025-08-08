import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import AdminPlans from './components/AdminPlans.jsx';
import AdminContent from './components/AdminContent.jsx';
import AdminLayout from './components/AdminLayout.tsx';
import AdminUsers from './components/AdminUsers.jsx';
import AdminRoles from './components/AdminRoles.jsx';
import AdminPlaceholder from './components/AdminPlaceholder.jsx';
import AdminClients from './components/AdminClients.tsx';
import AdminClientDetails from './components/AdminClientDetails.tsx';
import AdminPartners from './components/AdminPartners.tsx';
import Logout from './components/Logout.jsx';
import VehicleSpecsDashboard from './components/VehicleSpecsDashboard.jsx';
import VehicleSpecForm from './components/VehicleSpecForm.jsx';
import VehicleList from './components/VehicleList.jsx';
import VehicleCatalog from './components/VehicleCatalog.jsx';
import MastersDashboard from './components/MastersDashboard.jsx';
import ManageMakes from './components/ManageMakes.jsx';
import MakeForm from './components/MakeForm.jsx';
import AdminVehicleTypesPage from './components/AdminVehicleTypesPage.tsx';
import AdminVehicleTypeFormPage from './components/AdminVehicleTypeFormPage.tsx';
import AdminBodyTypesPage from './components/AdminBodyTypesPage.tsx';
import AdminBodyTypeFormPage from './components/AdminBodyTypeFormPage.tsx';
import AdminModelsPage from './components/AdminModelsPage.tsx';
import AdminModelFormPage from './components/AdminModelFormPage.tsx';
import AdminWmiPage from './components/AdminWmiPage.tsx';
import AdminWmiFormPage from './components/AdminWmiFormPage.tsx';
import AdminModelYearsPage from './components/AdminModelYearsPage.tsx';
import AdminModelYearFormPage from './components/AdminModelYearFormPage.tsx';
import AdminTrimsPage from './components/AdminTrimsPage.tsx';
import AdminTrimFormPage from './components/AdminTrimFormPage.tsx';
import AdminEngineSizesPage from './components/AdminEngineSizesPage.tsx';
import AdminEngineSizeFormPage from './components/AdminEngineSizeFormPage.tsx';
import AdminTransmissionsPage from './components/AdminTransmissionsPage.tsx';
import AdminTransmissionFormPage from './components/AdminTransmissionFormPage.tsx';
import AdminRegionsPage from './components/AdminRegionsPage.tsx';
import AdminRegionFormPage from './components/AdminRegionFormPage.tsx';
import AdminSeatsPage from './components/AdminSeatsPage.tsx';
import AdminSeatFormPage from './components/AdminSeatFormPage.tsx';
import AdminDoorsPage from './components/AdminDoorsPage.tsx';
import AdminDoorFormPage from './components/AdminDoorFormPage.tsx';
import AdminCylindersPage from './components/AdminCylindersPage.tsx';
import AdminCylinderFormPage from './components/AdminCylinderFormPage.tsx';
import AdminFuelTypesPage from './components/AdminFuelTypesPage.tsx';
import AdminFuelTypeFormPage from './components/AdminFuelTypeFormPage.tsx';
import AdminCategoriesPage from './components/AdminCategoriesPage.tsx';
import AdminCategoryFormPage from './components/AdminCategoryFormPage.tsx';
import AdminDepreciationsPage from './components/AdminDepreciationsPage.tsx';
import AdminDepreciationFormPage from './components/AdminDepreciationFormPage.tsx';
import AdminDriveTrainsPage from './components/AdminDriveTrainsPage.tsx';
import AdminDriveTrainFormPage from './components/AdminDriveTrainFormPage.tsx';
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
 * Root component establishing application routes and context providers.
 * Each route renders a page component which may interact with backend APIs
 * through services located in `src/services`.
 */
export default function App() {
  return (
    <AuthProvider>
      {/* AuthProvider and ContentProvider expose global state such as the
          logged-in user and editable marketing copy to all nested routes. */}
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
              <Route path="clients/:id" element={<AdminClientDetails />} />
              <Route path="partners" element={<AdminPartners />} />
              <Route path="catalog" element={<AdminPlaceholder title="Catalog Management" />} />
              <Route path="services" element={<AdminPlaceholder title="Services Control" />} />
              <Route path="logs" element={<AdminPlaceholder title="Logs & Audits" />} />
              <Route path="plans" element={<AdminPlans />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="specs" element={<VehicleSpecsDashboard />} />
              <Route path="specs/add" element={<VehicleSpecForm />} />
              <Route path="specs/edit/:id" element={<VehicleSpecForm />} />
              <Route path="masters" element={<MastersDashboard />} />
              <Route path="masters/vehicle-types" element={<AdminVehicleTypesPage />} />
              <Route path="masters/vehicle-types/add" element={<AdminVehicleTypeFormPage />} />
              <Route path="masters/vehicle-types/edit/:id" element={<AdminVehicleTypeFormPage />} />
              <Route path="masters/body-types" element={<AdminBodyTypesPage />} />
              <Route path="masters/body-types/add" element={<AdminBodyTypeFormPage />} />
              <Route path="masters/body-types/edit/:id" element={<AdminBodyTypeFormPage />} />
              <Route path="masters/models" element={<AdminModelsPage />} />
              <Route path="masters/models/add" element={<AdminModelFormPage />} />
              <Route path="masters/models/edit/:id" element={<AdminModelFormPage />} />
              <Route path="masters/makes" element={<ManageMakes />} />
              <Route path="masters/makes/add" element={<MakeForm />} />
              <Route path="masters/makes/edit/:id" element={<MakeForm />} />
              <Route path="masters/wmi" element={<AdminWmiPage />} />
              <Route path="masters/wmi/add" element={<AdminWmiFormPage />} />
              <Route path="masters/wmi/edit/:wmiId" element={<AdminWmiFormPage />} />
              <Route path="masters/model-years" element={<AdminModelYearsPage />} />
              <Route path="masters/model-years/add" element={<AdminModelYearFormPage />} />
              <Route path="masters/model-years/edit/:yearId" element={<AdminModelYearFormPage />} />
              <Route path="masters/trims" element={<AdminTrimsPage />} />
              <Route path="masters/trims/add" element={<AdminTrimFormPage />} />
              <Route path="masters/trims/edit/:trimId" element={<AdminTrimFormPage />} />
              <Route path="masters/engine-sizes" element={<AdminEngineSizesPage />} />
              <Route path="masters/engine-sizes/add" element={<AdminEngineSizeFormPage />} />
              <Route path="masters/engine-sizes/edit/:engineId" element={<AdminEngineSizeFormPage />} />
              <Route path="masters/transmissions" element={<AdminTransmissionsPage />} />
              <Route path="masters/transmissions/add" element={<AdminTransmissionFormPage />} />
              <Route path="masters/transmissions/edit/:transmissionId" element={<AdminTransmissionFormPage />} />
              <Route path="masters/regions" element={<AdminRegionsPage />} />
              <Route path="masters/regions/add" element={<AdminRegionFormPage />} />
              <Route path="masters/regions/edit/:regionId" element={<AdminRegionFormPage />} />
              <Route path="masters/seats" element={<AdminSeatsPage />} />
              <Route path="masters/seats/add" element={<AdminSeatFormPage />} />
              <Route path="masters/seats/edit/:seatId" element={<AdminSeatFormPage />} />
              <Route path="masters/doors" element={<AdminDoorsPage />} />
              <Route path="masters/doors/add" element={<AdminDoorFormPage />} />
              <Route path="masters/doors/edit/:doorId" element={<AdminDoorFormPage />} />
              <Route path="masters/cylinders" element={<AdminCylindersPage />} />
              <Route path="masters/cylinders/add" element={<AdminCylinderFormPage />} />
              <Route path="masters/cylinders/edit/:cylinderId" element={<AdminCylinderFormPage />} />
              <Route path="masters/categories" element={<AdminCategoriesPage />} />
              <Route path="masters/categories/add" element={<AdminCategoryFormPage />} />
              <Route path="masters/categories/edit/:categoryId" element={<AdminCategoryFormPage />} />
              <Route path="masters/fuel-types" element={<AdminFuelTypesPage />} />
              <Route path="masters/fuel-types/add" element={<AdminFuelTypeFormPage />} />
              <Route path="masters/fuel-types/edit/:fuelTypeId" element={<AdminFuelTypeFormPage />} />
              <Route path="masters/depreciations" element={<AdminDepreciationsPage />} />
              <Route path="masters/depreciations/add" element={<AdminDepreciationFormPage />} />
              <Route path="masters/depreciations/edit/:depreciationId" element={<AdminDepreciationFormPage />} />
              <Route path="masters/drive-trains" element={<AdminDriveTrainsPage />} />
              <Route path="masters/drive-trains/add" element={<AdminDriveTrainFormPage />} />
              <Route path="masters/drive-trains/edit/:driveTrainId" element={<AdminDriveTrainFormPage />} />
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


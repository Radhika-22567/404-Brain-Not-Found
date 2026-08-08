import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import Documents from './pages/Documents';
import DocumentDetails from './pages/DocumentDetails';
import VerificationQueue from './pages/VerificationQueue';
import VerificationHistory from './pages/VerificationHistory';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import ReferenceRecords from './pages/ReferenceRecords';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const Layout = () => (
  <div className="app-layout">
    <Sidebar />
    <div className="main-content">
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentDetails />} />
        <Route path="/verification-queue" element={<RoleGuard allowedRoles={['admin', 'verifier']}><VerificationQueue /></RoleGuard>} />
        <Route path="/verification-history" element={<VerificationHistory />} />
        <Route path="/analytics" element={<RoleGuard allowedRoles={['admin', 'verifier']}><Analytics /></RoleGuard>} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reference-records" element={<RoleGuard allowedRoles={['admin', 'verifier']}><ReferenceRecords /></RoleGuard>} />
        <Route path="/users" element={<RoleGuard allowedRoles={['admin']}><Users /></RoleGuard>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<Layout />} />
      </Route>
    </Routes>
  );
}

export default App;
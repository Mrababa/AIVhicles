import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Logs the user out and redirects to the login page.
 */
export default function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/login" replace />;
}


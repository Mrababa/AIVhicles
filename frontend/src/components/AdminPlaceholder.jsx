import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Generic placeholder page for admin sections not yet implemented.
 */
export default function AdminPlaceholder({ title }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
      <p className="mt-4 text-slate-700 dark:text-slate-300">
        This section is under construction.
      </p>
    </div>
  );
}


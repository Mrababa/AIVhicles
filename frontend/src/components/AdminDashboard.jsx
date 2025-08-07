import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

/**
 * Admin portal skeleton listing the primary management areas available to
 * administrators. Each section is currently a placeholder describing the
 * expected functionality.
 */
export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const sections = [
    {
      title: 'Dashboard',
      description:
        'KPIs including daily users, service requests, success rates and total earnings.',
    },
    {
      title: 'User Management',
      description:
        'Search and edit accounts, apply bans, reset data and view detailed usage logs.',
    },
    {
      title: 'Subscription Management',
      description:
        'Configure pricing plans, free trial limits and subscription renewal rules.',
    },
    {
      title: 'Service Logs',
      description:
        'Access raw logs for VIN decoding, AI usage, errors and request latency.',
    },
    {
      title: 'Feedback & Support Tickets',
      description:
        'Read, track and respond to user feedback and support issues.',
    },
    {
      title: 'Content Management',
      description:
        'Update homepage banners, marketing text, FAQ items and pricing content.',
    },
    {
      title: 'System Settings',
      description:
        'Enable or disable services, adjust thresholds and manage API providers.',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Admin Dashboard
      </h1>
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-lg bg-white p-6 shadow dark:bg-slate-800"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


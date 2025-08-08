import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * Simple detail page for managing a single client.
 * Currently acts as a placeholder until real data is wired up.
 */
export default function AdminClientDetails() {
  const { id } = useParams();
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Client Details</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Managing client with ID: {id}
      </p>
    </div>
  );
}

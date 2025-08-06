import React from 'react';
import { Link } from 'react-router-dom';

/** Dedicated header for the vehicle catalog page */
export default function CatalogHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
      <div className="text-lg font-semibold">VehiclesData</div>
      <Link to="/" className="text-sm text-indigo-600 hover:underline">
        &larr; Back to Home
      </Link>
    </header>
  );
}

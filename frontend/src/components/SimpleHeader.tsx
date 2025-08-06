import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

/**
 * Simple site header used on secondary pages.
 */
export default function SimpleHeader() {
  return (
    <header className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 shadow">
      <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <SparklesIcon className="w-6 h-6" />
          <span className="text-lg font-bold">VehiclesData</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/services" className="hover:text-indigo-600">
            Services
          </Link>
          <Link to="/pricing" className="hover:text-indigo-600">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link to="/faq" className="hover:text-indigo-600">
            FAQs
          </Link>
          <Link to="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>
    </header>
  );
}


import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

/**
 * Global footer displayed on every page.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Main content area */}
      <div className="bg-slate-800 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand block */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2">
                <SparklesIcon className="w-8 h-8" />
                <span className="text-2xl font-bold">VehiclesData</span>
              </Link>
              <p className="mt-4 text-slate-400 text-sm">
                Trusted data insights and tools for vehicle enthusiasts and developers.
              </p>
            </div>

            {/* Company links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/about" className="text-sm hover:text-indigo-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm hover:text-indigo-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm hover:text-indigo-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developer links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                Developers
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/api" className="text-sm hover:text-indigo-400">
                    API
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-sm hover:text-indigo-400">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-sm hover:text-indigo-400">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/privacy" className="text-sm hover:text-indigo-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm hover:text-indigo-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm hover:text-indigo-400">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sub footer */}
      <div className="bg-slate-900 text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm">
              © {year} VehiclesData Inc. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12a10 10 0 10-11.5 9.95v-7.05h-2.8v-2.9h2.8V9.35c0-2.78 1.67-4.3 4.22-4.3 1.22 0 2.5.22 2.5.22v2.74h-1.41c-1.39 0-1.82.86-1.82 1.74v2.1h3.09l-.49 2.9h-2.6v7.05A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43 2a9.1 9.1 0 01-2.88 1.1A4.51 4.51 0 0016.11 0c-2.64 0-4.78 2.11-4.78 4.72 0 .37.04.73.12 1.07A12.94 12.94 0 011.64.9a4.6 4.6 0 00-.64 2.38 4.72 4.72 0 002.13 3.94A4.49 4.49 0 01.96 6v.06c0 2.24 1.63 4.1 3.77 4.52a4.6 4.6 0 01-2.13.08c.6 1.86 2.38 3.2 4.48 3.24A9.06 9.06 0 010 19.54a12.84 12.84 0 006.95 2.03c8.35 0 12.92-6.79 12.92-12.68 0-.2 0-.39-.02-.58A9.22 9.22 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.5c-1.14 0-2.06-.92-2.06-2.06 0-1.13.92-2.05 2.06-2.05 1.13 0 2.05.92 2.05 2.05 0 1.14-.92 2.06-2.05 2.06zm15.11 12.95h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67h-3.55V9h3.4v1.56h.05c.47-.9 1.61-1.86 3.32-1.86 3.55 0 4.21 2.34 4.21 5.38v6.37z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


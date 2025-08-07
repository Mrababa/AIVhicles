import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

/**
 * Header for the admin portal providing navigation and quick access to
 * account and system controls.
 */
export default function AdminHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const environment = import.meta.env.VITE_ENV || import.meta.env.MODE;

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Users Management', href: '/admin/users' },
    { name: 'Catalog Management', href: '/admin/catalog' },
    { name: 'Services Control', href: '/admin/services' },
    { name: 'Logs & Audits', href: '/admin/logs' },
    { name: 'Plans & Pricing', href: '/admin/plans' },
    { name: 'Content Management', href: '/admin/content' },
  ];

  return (
    <header className="bg-white dark:bg-slate-800 shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-2 text-slate-900 dark:text-slate-100"
            >
              <SparklesIcon className="w-6 h-6" />
              <span className="font-bold">VehiclesData</span>
              <span className="ml-1 text-xs px-2 py-0.5 rounded bg-indigo-600 text-white">
                Admin Portal
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:space-x-4 md:items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="rounded-md border border-slate-300 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="button"
              className="relative p-1 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white"
            >
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center text-sm text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-white"
              >
                Admin
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-700">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-600"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-600"
                  >
                    System Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-600"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
            {environment && (
              <span className="hidden sm:inline-block rounded bg-slate-200 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                {environment}
              </span>
            )}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}


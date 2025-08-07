import React, { useEffect, useRef, useState } from 'react';
import { Bars3Icon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white px-4 shadow dark:bg-slate-800">
      <button
        type="button"
        onClick={onMenuClick}
        className="p-2 text-slate-700 hover:text-indigo-600 focus:outline-none lg:hidden"
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className="ml-auto relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center rounded-full p-1 text-slate-700 hover:text-indigo-600 focus:outline-none dark:text-slate-200"
          aria-label="Open user menu"
        >
          <UserCircleIcon className="h-8 w-8" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-700">
            <div className="px-4 py-2 text-sm text-slate-700 dark:text-slate-200">admin@example.com</div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}


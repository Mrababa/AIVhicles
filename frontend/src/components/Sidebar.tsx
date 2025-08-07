import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  QueueListIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import LogoIcon from './LogoIcon.jsx';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const sections = [
    {
      title: 'MAIN',
      links: [
        { name: 'Dashboard', to: '/admin/dashboard', icon: HomeIcon },
      ],
    },
    {
      title: 'MANAGEMENT',
      links: [
        { name: 'Users', to: '/admin/users', icon: UserGroupIcon },
        { name: 'Roles', to: '/admin/roles', icon: ShieldCheckIcon },
        { name: 'Catalog', to: '/admin/catalog', icon: RectangleStackIcon },
        { name: 'Services', to: '/admin/services', icon: WrenchScrewdriverIcon },
        { name: 'Logs', to: '/admin/logs', icon: QueueListIcon },
        { name: 'Plans', to: '/admin/plans', icon: CreditCardIcon },
        { name: 'Content', to: '/admin/content', icon: DocumentTextIcon },
      ],
    },
    {
      title: 'ACCOUNT',
      links: [
        { name: 'Profile', to: '/admin/profile', icon: UserCircleIcon },
        { name: 'Settings', to: '/admin/settings', icon: Cog6ToothIcon },
      ],
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-800 text-slate-100 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center px-4 py-4">
        <NavLink to="/" className="flex items-center space-x-2" onClick={onClose}>
          <LogoIcon className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-bold">VehiclesData</span>
        </NavLink>
      </div>
      <nav className="mt-4 px-2">
        {sections.map((section) => (
          <div key={section.title} className="mt-6 first:mt-0">
            <h2 className="px-3 text-xs font-semibold text-slate-400">{section.title}</h2>
            {section.links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `mt-1 flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-700 hover:text-white ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300'}`
                }
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.name}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers as LayersIcon, PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { sampleVehicleTypes } from './mastersData';

export default function AdminVehicleTypesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = sampleVehicleTypes.filter((t) => {
    const term = search.toLowerCase();
    const matchesSearch =
      t.nameEn.toLowerCase().includes(term) || t.nameAr.toLowerCase().includes(term);
    const matchesStatus = status === 'all' || (status === 'active' ? t.active : !t.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Vehicle Types</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage vehicle type records.</p>
        </div>
        <Link
          to="/admin/masters/vehicle-types/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <LayersIcon className="mr-2 h-5 w-5" />
          Create New Vehicle Type
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filtered.length ? (
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg dark:bg-slate-800">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Name (EN/AR)</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Code</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{t.nameEn}</div>
                      <div className="text-sm text-slate-500" dir="rtl">{t.nameAr}</div>
                    </div>
                  </td>
                  <td className="p-4">{t.code}</td>
                  <td className="p-4"><StatusBadge active={t.active} /></td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/vehicle-types/edit/${t.id}`}
                      className="inline-flex items-center rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <PencilIcon className="h-5 w-5 text-indigo-600" />
                    </Link>
                    <button
                      disabled
                      className="ml-2 inline-flex items-center rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"
                    >
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Vehicle Types found.</div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleVehicleTypes } from './mastersData';

/**
 * Management page for vehicle types.
 * Provides a filter bar and table listing all vehicle types.
 */
export default function ManageVehicleTypes() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = sampleVehicleTypes.filter((t) => {
    const term = search.toLowerCase();
    const matchesSearch =
      t.nameEn.toLowerCase().includes(term) ||
      t.nameAr.toLowerCase().includes(term);
    const matchesStatus =
      status === 'all' || (status === 'active' ? t.active : !t.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Manage Vehicle Types
        </h1>
        <Link
          to="/admin/masters/vehicle-types/add"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          + Create New
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500 sm:w-48"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                Name (EN)
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                Name (AR)
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                Code
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                <td className="px-4 py-2">{t.nameEn}</td>
                <td className="px-4 py-2" dir="rtl">
                  {t.nameAr}
                </td>
                <td className="px-4 py-2">{t.code}</td>
                <td className="px-4 py-2">
                  {t.active ? (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="rounded bg-slate-200 px-2 py-1 text-xs font-medium text-slate-800">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  <Link
                    to={`/admin/masters/vehicle-types/edit/${t.id}`}
                    className="rounded-md p-2 text-indigo-600 hover:bg-slate-100"
                  >
                    Edit
                  </Link>
                  <button
                    className="ml-2 rounded-md p-2 text-red-600 hover:bg-slate-100"
                    disabled
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

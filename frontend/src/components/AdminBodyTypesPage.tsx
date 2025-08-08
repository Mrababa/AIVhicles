import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers as LayersIcon, PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { sampleBodyTypes, sampleVehicleTypes } from './mastersData';

export default function AdminBodyTypesPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [vehicleType, setVehicleType] = useState('all');

  const filtered = sampleBodyTypes.filter((b) => {
    const term = search.toLowerCase();
    const matchesSearch =
      b.nameEn.toLowerCase().includes(term) || b.nameAr.toLowerCase().includes(term);
    const matchesStatus = status === 'all' || (status === 'active' ? b.active : !b.active);
    const matchesVehicleType =
      vehicleType === 'all' || b.vehicleTypes.includes(Number(vehicleType));
    return matchesSearch && matchesStatus && matchesVehicleType;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Body Types</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage body type records.</p>
        </div>
        <Link
          to="/admin/masters/body-types/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <LayersIcon className="mr-2 h-5 w-5" />
          Create New Body Type
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Vehicle Types</option>
            {sampleVehicleTypes.map((vt) => (
              <option key={vt.id} value={vt.id}>
                {vt.nameEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length ? (
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg dark:bg-slate-800">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Name (EN/AR)</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Associated Vehicle Types</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{b.nameEn}</div>
                      <div className="text-sm text-slate-500" dir="rtl">{b.nameAr}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {b.vehicleTypes.map((id) => {
                        const vt = sampleVehicleTypes.find((v) => v.id === id);
                        return (
                          <span
                            key={id}
                            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          >
                            {vt?.nameEn}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="p-4"><StatusBadge active={b.active} /></td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/body-types/edit/${b.id}`}
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
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Body Types found.</div>
      )}
    </div>
  );
}

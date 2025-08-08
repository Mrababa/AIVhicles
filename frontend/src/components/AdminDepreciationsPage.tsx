import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import {
  sampleDepreciations,
  sampleVehicleTypes,
  sampleCategories,
} from './mastersData';

export default function AdminDepreciationsPage() {
  const [vehicleType, setVehicleType] = useState('all');
  const [category, setCategory] = useState('all');

  const filtered = sampleDepreciations.filter((d) => {
    const vtMatch = vehicleType === 'all' || d.vehicleTypeId === Number(vehicleType);
    const catMatch = category === 'all' || d.categoryId === Number(category);
    return vtMatch && catMatch;
  });

  const vehicleTypeName = (id: number) =>
    sampleVehicleTypes.find((v) => v.id === id)?.nameEn;
  const categoryName = (id?: number) =>
    sampleCategories.find((c) => c.id === id)?.name;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Depreciations</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage depreciation rules.</p>
        </div>
        <Link
          to="/admin/masters/depreciations/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Depreciation
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Categories</option>
            {sampleCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Year Range</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Depreciation Rate (%)</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Vehicle Type</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Category</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-4 font-medium">{d.yearRange}</td>
                  <td className="p-4">{d.rate}</td>
                  <td className="p-4">{vehicleTypeName(d.vehicleTypeId)}</td>
                  <td className="p-4">{categoryName(d.categoryId) || '-'}</td>
                  <td className="p-4"><StatusBadge active={d.active} /></td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/depreciations/edit/${d.id}`}
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
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Depreciations found.</div>
      )}
    </div>
  );
}

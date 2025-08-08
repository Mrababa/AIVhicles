import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { sampleSeats, sampleVehicleTypes } from './mastersData';

export default function AdminSeatsPage() {
  const [search, setSearch] = useState('');

  const filtered = sampleSeats.filter((s) => {
    const term = search.toLowerCase();
    return String(s.count).includes(term) || s.label?.toLowerCase().includes(term);
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Seats</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage seat configurations.</p>
        </div>
        <Link
          to="/admin/masters/seats/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Seat Configuration
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <input
          type="text"
          placeholder="Search by count or label"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
        />
      </div>

      {filtered.length ? (
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg dark:bg-slate-800">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Count</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Configuration Label</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Vehicle Types</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-4 font-medium">{s.count}</td>
                  <td className="p-4">{s.label}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {s.vehicleTypes?.map((id) => {
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
                  <td className="p-4"><StatusBadge active={s.active} /></td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/seats/edit/${s.id}`}
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
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Seat configurations found.</div>
      )}
    </div>
  );
}


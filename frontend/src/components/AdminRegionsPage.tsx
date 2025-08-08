import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { sampleRegions } from './mastersData';

export default function AdminRegionsPage() {
  const [search, setSearch] = useState('');

  const filtered = sampleRegions.filter((r) => {
    const term = search.toLowerCase();
    return r.name.toLowerCase().includes(term) || r.countries?.toLowerCase().includes(term);
  });

  const truncate = (str = '') => (str.length > 30 ? `${str.slice(0, 30)}...` : str);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Regions</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage region records.</p>
        </div>
        <Link
          to="/admin/masters/regions/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Region
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <input
          type="text"
          placeholder="Search by region or country"
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
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Region Name</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Countries</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-4 font-medium">{r.name}</td>
                  <td className="p-4">
                    <span title={r.countries}>{truncate(r.countries)}</span>
                  </td>
                  <td className="p-4"><StatusBadge active={r.active} /></td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/regions/edit/${r.id}`}
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
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Regions found.</div>
      )}
    </div>
  );
}


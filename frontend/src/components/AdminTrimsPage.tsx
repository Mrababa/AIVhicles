import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { sampleTrims, sampleModels, sampleMakes, sampleModelYearMasters } from './mastersData';

export default function AdminTrimsPage() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('all');
  const [make, setMake] = useState('all');
  const [year, setYear] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = sampleTrims.filter((t) => {
    const term = name.toLowerCase();
    const nameMatch =
      t.nameEn.toLowerCase().includes(term) || t.nameAr.toLowerCase().includes(term);
    const modelMatch = model === 'all' || t.modelId === Number(model);
    const makeMatch =
      make === 'all' || sampleModels.find((m) => m.id === t.modelId)?.makeId === Number(make);
    const yearMatch = year === 'all' || t.year === Number(year);
    const statusMatch =
      status === 'all' || (status === 'active' ? t.active : !t.active);
    return nameMatch && modelMatch && makeMatch && yearMatch && statusMatch;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Trims</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage model trims.</p>
        </div>
        <Link
          to="/admin/masters/trims/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Trim
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Makes</option>
            {sampleMakes.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nameEn}
              </option>
            ))}
          </select>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Models</option>
            {sampleModels.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nameEn}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Years</option>
            {sampleModelYearMasters.map((y) => (
              <option key={y.id} value={y.year}>
                {y.year}
              </option>
            ))}
          </select>
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
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Trim Name</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Associated Model</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Year</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((t) => {
                const modelObj = sampleModels.find((m) => m.id === t.modelId);
                const makeObj = sampleMakes.find((m) => m.id === modelObj?.makeId);
                return (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">{t.nameEn}</div>
                        <div className="text-sm text-slate-500" dir="rtl">{t.nameAr}</div>
                      </div>
                    </td>
                    <td className="p-4">{makeObj?.nameEn} {modelObj?.nameEn}</td>
                    <td className="p-4">{t.year}</td>
                    <td className="p-4"><StatusBadge active={t.active} /></td>
                    <td className="p-4 text-right">
                      <Link
                        to={`/admin/masters/trims/edit/${t.id}`}
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
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Trims found.</div>
      )}
    </div>
  );
}

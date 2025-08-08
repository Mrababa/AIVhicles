import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleMakes, sampleVehicleTypes } from './mastersData';
import { RectangleStackIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * Enhanced management page for vehicle makes following the new
 * master-entity list view guidelines. Provides searching, filtering and
 * pagination along with a responsive table layout.
 */
export default function ManageMakes() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = sampleMakes.filter((m) => {
    const term = search.toLowerCase();
    const matchesSearch =
      m.nameEn.toLowerCase().includes(term) ||
      m.nameAr.toLowerCase().includes(term);
    const matchesStatus =
      status === 'all' || (status === 'active' ? m.active : !m.active);
    const matchesType =
      type === 'all' || m.vehicleTypes.includes(Number(type));
    return matchesSearch && matchesStatus && matchesType;
  });

  const pageCount = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Manage Makes
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Add, edit, or delete vehicle manufacturers.
          </p>
        </div>
        <Link
          to="/admin/masters/makes/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <RectangleStackIcon className="mr-2 h-5 w-5" />
          Create New Make
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
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

      {paginated.length > 0 ? (
        <div className="overflow-x-auto rounded-lg bg-white shadow-lg dark:bg-slate-800">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Name
                </th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Vehicle Types
                </th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Is Frequently Used
                </th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paginated.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/40"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {m.logo && (
                        <img
                          src={m.logo}
                          alt=""
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {m.nameEn}
                        </div>
                        <div className="text-sm text-slate-500" dir="rtl">
                          {m.nameAr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {m.vehicleTypes.map((id) => {
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
                  <td className="p-4">
                    {m.active ? (
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-800">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {m.frequent ? (
                      <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-800">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/makes/edit/${m.id}`}
                      aria-label="Edit"
                      className="inline-flex items-center rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <PencilIcon className="h-5 w-5 text-indigo-600" />
                    </Link>
                    <button
                      aria-label="Delete"
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
          <div className="flex items-center justify-between border-t border-slate-200 p-4 text-sm dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-md border-slate-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                {page} / {pageCount}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
                disabled={page === pageCount}
                className="rounded-md border border-slate-300 px-2 py-1 dark:border-slate-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">
          No Makes found. Try adjusting your filters or create a new one.
        </div>
      )}
    </div>
  );
}


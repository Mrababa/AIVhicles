import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { getSpecifications } from '../services/specService';

/**
 * Admin dashboard listing vehicle specifications with search and filter controls.
 */
export default function VehicleSpecsDashboard() {
  const [specs, setSpecs] = useState([]);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  useEffect(() => {
    getSpecifications().then(setSpecs).catch(() => setSpecs([]));
  }, []);

  const filtered = useMemo(() => {
    return specs.filter((s) => {
      const matchesSearch =
        `${s.make} ${s.model} ${s.trim}`
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchesRegion = regionFilter === 'All' || s.region === regionFilter;
      const matchesYear = yearFilter === 'All' || String(s.year) === yearFilter;
      return matchesSearch && matchesRegion && matchesYear;
    });
  }, [specs, search, regionFilter, yearFilter]);

  const regions = Array.from(new Set(specs.map((s) => s.region)));
  const years = Array.from(new Set(specs.map((s) => s.year))).sort();

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Vehicle Specifications
        </h1>
        <Link
          to="/admin/specs/add"
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" /> Add Specification
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search make, model, or trim"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          <option>All</option>
          {regions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2"
        >
          <option>All</option>
          {years.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No specifications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Vehicle
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Region
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-slate-700">
                  Last Updated
                </th>
                <th className="px-4 py-2 text-right text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((spec) => (
                <tr key={spec.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">
                    <div className="font-medium text-slate-900">
                      {spec.year} {spec.make} {spec.model}
                    </div>
                    <div className="text-sm text-slate-600">{spec.trim}</div>
                  </td>
                  <td className="px-4 py-2">{spec.region}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={spec.status} />
                  </td>
                  <td className="px-4 py-2">
                    {new Date(spec.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Link
                      to={`/admin/specs/edit/${spec.id}`}
                      className="rounded-md p-2 text-indigo-600 hover:bg-slate-100"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    PUBLISHED: 'bg-green-100 text-green-800',
    DRAFT: 'bg-yellow-100 text-yellow-800',
    ARCHIVED: 'bg-gray-100 text-gray-800',
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
        styles[status] || styles.DRAFT
      }`}
    >
      {status}
    </span>
  );
}

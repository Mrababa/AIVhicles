import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { getSpecifications } from '../services/specService';
import VehicleSpecsFilterBar from './VehicleSpecsFilterBar';

/**
 * Admin dashboard listing vehicle specifications with search and filter controls.
 */
export default function VehicleSpecsDashboard() {
  const [specs, setSpecs] = useState([]);
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');

  useEffect(() => {
    // Initial load of all specs from the backend API.
    getSpecifications()
      .then((data) => setSpecs(Array.isArray(data) ? data : []))
      .catch(() => setSpecs([]));
  }, []);

  // Derive a filtered list client-side to avoid extra API calls when the user
  // adjusts search criteria. The backend is only hit on initial load or when
  // a spec is created/edited.
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

  // Generate unique lists of regions and years for filter dropdown options.
  const regions = Array.from(new Set(specs.map((s) => s.region)));
  const years = Array.from(new Set(specs.map((s) => s.year))).sort();

  function exportToCSV() {
    // Client-side CSV export of the currently filtered specifications.
    // Backend should eventually provide a dedicated export endpoint.
    const headers = ['Year', 'Make', 'Model', 'Trim', 'Region', 'Status', 'Last Updated'];
    const rows = filtered.map((s) => [
      s.year,
      s.make,
      s.model,
      s.trim,
      s.region,
      s.status,
      new Date(s.lastUpdated).toISOString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vehicle-specifications.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Vehicle Specifications
        </h1>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium hover:bg-slate-300"
          >
            Export CSV
          </button>
          <Link
            to="/admin/specs/add"
            className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <PlusIcon className="mr-2 h-5 w-5" /> Add Specification
          </Link>
        </div>
      </div>

      <VehicleSpecsFilterBar
        search={search}
        setSearch={setSearch}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        regions={regions}
        years={years}
      />

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

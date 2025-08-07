import React from 'react';

/**
 * Search and filter controls for the Vehicle Specifications dashboard.
 */
export default function VehicleSpecsFilterBar({
  search,
  setSearch,
  regionFilter,
  setRegionFilter,
  yearFilter,
  setYearFilter,
  regions,
  years,
}) {
  return (
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
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { sampleEngineSizes, sampleFuelTypes, sampleVehicleTypes } from './mastersData';

export default function AdminEngineSizesPage() {
  const [label, setLabel] = useState('');
  const [fuel, setFuel] = useState('all');
  const [vehicleType, setVehicleType] = useState('all');

  const filtered = sampleEngineSizes.filter((e) => {
    const labelMatch = e.label.toLowerCase().includes(label.toLowerCase());
    const fuelMatch = fuel === 'all' || e.fuelTypeId === Number(fuel);
    const vtMatch =
      vehicleType === 'all' || e.vehicleTypes?.includes(Number(vehicleType));
    return labelMatch && fuelMatch && vtMatch;
  });

  const fuelName = (id?: number) => sampleFuelTypes.find((f) => f.id === id)?.name;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Engine Sizes</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Manage engine size records.</p>
        </div>
        <Link
          to="/admin/masters/engine-sizes/add"
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Engine Size
        </Link>
      </div>

      <div className="mb-6 rounded-lg bg-white p-4 shadow-md dark:bg-slate-800">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Filter by label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Fuel Types</option>
            {sampleFuelTypes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="all">All Vehicle Types</option>
            {sampleVehicleTypes.map((v) => (
              <option key={v.id} value={v.id}>
                {v.nameEn}
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
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Display Label</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Capacity (cc)</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Fuel Type</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Vehicle Types</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="p-4 font-medium">{e.label}</td>
                  <td className="p-4">{e.capacity}</td>
                  <td className="p-4">{fuelName(e.fuelTypeId)}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {e.vehicleTypes?.map((id) => {
                        const vt = sampleVehicleTypes.find((v) => v.id === id);
                        return (
                          <span key={id} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                            {vt?.nameEn}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="p-4"><StatusBadge active={e.active} /></td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/admin/masters/engine-sizes/edit/${e.id}`}
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
        <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800">No Engine Sizes found.</div>
      )}
    </div>
  );
}

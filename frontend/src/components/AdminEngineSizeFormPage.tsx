import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleEngineSizes, sampleFuelTypes, sampleVehicleTypes } from './mastersData';

export default function AdminEngineSizeFormPage() {
  const { engineId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(engineId);

  const [form, setForm] = useState({
    label: '',
    capacity: '',
    fuelTypeId: '',
    vehicleTypes: [] as number[],
    active: true,
  });

  useEffect(() => {
    if (isEdit) {
      const existing = sampleEngineSizes.find((e) => e.id === Number(engineId));
      if (existing) {
        setForm({
          label: existing.label,
          capacity: existing.capacity ? String(existing.capacity) : '',
          fuelTypeId: existing.fuelTypeId ? String(existing.fuelTypeId) : '',
          vehicleTypes: existing.vehicleTypes || [],
          active: existing.active,
        });
      }
    }
  }, [engineId, isEdit]);

  const toggleVehicleType = (id: number) => {
    setForm((f) => {
      const exists = f.vehicleTypes.includes(id);
      return {
        ...f,
        vehicleTypes: exists ? f.vehicleTypes.filter((v) => v !== id) : [...f.vehicleTypes, id],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/masters/engine-sizes');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
      <Link
        to="/admin/masters/engine-sizes"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Engine Size' : 'Add Engine Size'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Display Label
          </label>
          <input
            id="label"
            type="text"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">A user-friendly label for display, e.g., '2.5L Hybrid'.</p>
        </div>
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Capacity (cc)
          </label>
          <input
            id="capacity"
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">Engine displacement in cubic centimeters, e.g., '1998'.</p>
        </div>
        <div>
          <label htmlFor="fuel" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Fuel Type
          </label>
          <select
            id="fuel"
            value={form.fuelTypeId}
            onChange={(e) => setForm({ ...form, fuelTypeId: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Fuel Type</option>
            {sampleFuelTypes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Vehicle Types
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sampleVehicleTypes.map((vt) => (
              <label key={vt.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.vehicleTypes.includes(vt.id)}
                  onChange={() => toggleVehicleType(vt.id)}
                />
                {vt.nameEn}
              </label>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/engine-sizes')}
            className="rounded-md bg-slate-200 px-5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

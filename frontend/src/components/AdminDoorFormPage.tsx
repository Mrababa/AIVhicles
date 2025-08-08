import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleDoors, sampleVehicleTypes } from './mastersData';

export default function AdminDoorFormPage() {
  const { doorId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(doorId);

  const [form, setForm] = useState({
    count: '',
    vehicleTypes: [] as number[],
    active: true,
  });

  useEffect(() => {
    if (isEdit) {
      const existing = sampleDoors.find((d) => d.id === Number(doorId));
      if (existing) {
        setForm({
          count: String(existing.count),
          vehicleTypes: existing.vehicleTypes || [],
          active: existing.active,
        });
      }
    }
  }, [isEdit, doorId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/masters/doors');
  };

  const toggleVehicleType = (id: number) => {
    setForm((prev) => {
      const next = prev.vehicleTypes.includes(id)
        ? prev.vehicleTypes.filter((v) => v !== id)
        : [...prev.vehicleTypes, id];
      return { ...prev, vehicleTypes: next };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800"
    >
      <Link
        to="/admin/masters/doors"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Door Count' : 'Add Door Count'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="count" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Count
          </label>
          <input
            id="count"
            type="number"
            min="1"
            value={form.count}
            onChange={(e) => setForm({ ...form, count: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vehicle Types
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {sampleVehicleTypes.filter((v) => v.active).map((vt) => {
              const checked = form.vehicleTypes.includes(vt.id);
              return (
                <label key={vt.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleVehicleType(vt.id)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  />
                  {vt.nameEn}
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/doors')}
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


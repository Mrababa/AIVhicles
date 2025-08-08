import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleFuelTypes, sampleVehicleTypes } from './mastersData';

export default function AdminFuelTypeFormPage() {
  const { fuelTypeId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(fuelTypeId);

  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    iconUrl: '',
    vehicleTypes: [] as number[],
    active: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const existing = sampleFuelTypes.find((f) => f.id === Number(fuelTypeId));
      if (existing) {
        setForm({
          nameEn: existing.nameEn,
          nameAr: existing.nameAr,
          iconUrl: existing.iconUrl || '',
          vehicleTypes: existing.vehicleTypes || [],
          active: existing.active,
        });
      }
    }
  }, [isEdit, fuelTypeId]);

  const validate = () => {
    const exists = sampleFuelTypes.some(
      (f) => f.nameEn.toLowerCase() === form.nameEn.toLowerCase() && (!isEdit || f.id !== Number(fuelTypeId))
    );
    if (exists) {
      setError('Name must be unique');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/admin/masters/fuel-types');
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
        to="/admin/masters/fuel-types"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Fuel Type' : 'Add Fuel Type'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="nameEn" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Name (English)
          </label>
          <input
            id="nameEn"
            type="text"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <div>
          <label htmlFor="nameAr" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Name (Arabic)
          </label>
          <input
            id="nameAr"
            type="text"
            dir="rtl"
            value={form.nameAr}
            onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="iconUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Icon URL
          </label>
          <input
            id="iconUrl"
            type="url"
            value={form.iconUrl}
            onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">
            Provide a public URL for the fuel type icon (e.g., a .svg or .png file).
          </p>
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
            onClick={() => navigate('/admin/masters/fuel-types')}
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

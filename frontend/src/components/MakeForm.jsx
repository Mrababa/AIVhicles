import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sampleMakes, sampleVehicleTypes } from './mastersData';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

/**
 * Add/Edit form for vehicle makes following the unified master form
 * design guidelines.
 */
export default function MakeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    active: true,
    vehicleTypes: [],
    frequent: false,
  });

  useEffect(() => {
    if (isEdit) {
      const existing = sampleMakes.find((m) => m.id === Number(id));
      if (existing) {
        setForm({
          nameEn: existing.nameEn,
          nameAr: existing.nameAr,
          active: existing.active,
          vehicleTypes: existing.vehicleTypes || [],
          frequent: existing.frequent || false,
        });
      }
    }
  }, [id, isEdit]);

  const handleToggle = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Persistence would occur here
    navigate('/admin/masters/makes');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800"
    >
      <Link
        to="/admin/masters/makes"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">
        {isEdit ? 'Edit Make' : 'Add Make'}
      </h1>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="nameEn"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Name (EN)
          </label>
          <input
            id="nameEn"
            type="text"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="nameAr"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Name (AR)
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
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vehicle Types
          </label>
          <div className="flex flex-wrap gap-4">
            {sampleVehicleTypes.map((vt) => {
              const checked = form.vehicleTypes.includes(vt.id);
              return (
                <label key={vt.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setForm((prev) => {
                        const next = checked
                          ? prev.vehicleTypes.filter((i) => i !== vt.id)
                          : [...prev.vehicleTypes, vt.id];
                        return { ...prev, vehicleTypes: next };
                      })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  />
                  {vt.nameEn}
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Active
          </label>
          <button
            type="button"
            onClick={() => handleToggle('active')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              form.active ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                form.active ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Frequently Used
          </label>
          <button
            type="button"
            onClick={() => handleToggle('frequent')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              form.frequent ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                form.frequent ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/makes')}
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


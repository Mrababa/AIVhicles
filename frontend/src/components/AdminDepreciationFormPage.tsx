import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import {
  sampleDepreciations,
  sampleVehicleTypes,
  sampleCategories,
} from './mastersData';

export default function AdminDepreciationFormPage() {
  const { depreciationId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(depreciationId);

  const [form, setForm] = useState({
    yearRange: '',
    rate: '' as any,
    vehicleTypeId: '' as any,
    categoryId: '' as any,
    active: true,
  });

  useEffect(() => {
    if (isEdit) {
      const existing = sampleDepreciations.find((d) => d.id === Number(depreciationId));
      if (existing) {
        setForm({
          yearRange: existing.yearRange,
          rate: existing.rate,
          vehicleTypeId: existing.vehicleTypeId,
          categoryId: existing.categoryId || '',
          active: existing.active,
        });
      }
    }
  }, [isEdit, depreciationId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/masters/depreciations');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800"
    >
      <Link
        to="/admin/masters/depreciations"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Depreciation' : 'Add Depreciation'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="yearRange" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Year Range
          </label>
          <input
            id="yearRange"
            type="text"
            value={form.yearRange}
            onChange={(e) => setForm({ ...form, yearRange: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">e.g., '0-5', '6-10'</p>
        </div>
        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Depreciation Rate (%)
          </label>
          <input
            id="rate"
            type="number"
            value={form.rate}
            onChange={(e) => setForm({ ...form, rate: Number(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">Enter the percentage value, e.g., '15.5'</p>
        </div>
        <div>
          <label htmlFor="vehicleType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            value={form.vehicleTypeId}
            onChange={(e) => setForm({ ...form, vehicleTypeId: Number(e.target.value) })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Vehicle Type</option>
            {sampleVehicleTypes.filter((v) => v.active).map((vt) => (
              <option key={vt.id} value={vt.id}>
                {vt.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            id="category"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Category</option>
            {sampleCategories.filter((c) => c.active).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/depreciations')}
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

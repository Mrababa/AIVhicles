import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleModelYearMasters } from './mastersData';

export default function AdminModelYearFormPage() {
  const { yearId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(yearId);

  const [form, setForm] = useState({ year: '', active: true });
  const [errors, setErrors] = useState<{ year?: string }>({});

  useEffect(() => {
    if (isEdit) {
      const existing = sampleModelYearMasters.find((y) => y.id === Number(yearId));
      if (existing) {
        setForm({ year: String(existing.year), active: existing.active });
      }
    }
  }, [yearId, isEdit]);

  const validate = () => {
    const errs: { year?: string } = {};
    const value = form.year.trim();
    if (!/^\d{4}$/.test(value)) {
      errs.year = 'Year must be a 4-digit number';
    }
    const exists = sampleModelYearMasters.some(
      (y) => y.year.toString() === value && (!isEdit || y.id !== Number(yearId))
    );
    if (exists) errs.year = 'Year must be unique';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/admin/masters/model-years');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
      <Link
        to="/admin/masters/model-years"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Model Year' : 'Add Model Year'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Year
          </label>
          <input
            id="year"
            type="number"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            required
            disabled={isEdit}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm disabled:bg-slate-100 disabled:dark:bg-slate-700"
          />
          {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year}</p>}
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/model-years')}
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

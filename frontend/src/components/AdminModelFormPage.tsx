import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleModels, sampleMakes, sampleVehicleTypes, sampleModelYears } from './mastersData';

export default function AdminModelFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    makeId: '' as any,
    vehicleTypeId: '' as any,
    modelYears: [] as number[],
    active: true,
  });
  const [makeFilter, setMakeFilter] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isEdit) {
      const existing = sampleModels.find((m) => m.id === Number(id));
      if (existing) {
        setForm({
          nameEn: existing.nameEn,
          nameAr: existing.nameAr,
          makeId: existing.makeId,
          vehicleTypeId: existing.vehicleTypeId,
          modelYears: existing.modelYears || [],
          active: existing.active,
        });
      }
    }
  }, [id, isEdit]);

  const validate = () => {
    const exists = sampleModels.some(
      (m) =>
        m.nameEn.toLowerCase() === form.nameEn.toLowerCase() &&
        m.makeId === Number(form.makeId) &&
        (!isEdit || m.id !== Number(id))
    );
    if (exists) {
      setError('Model with this make already exists');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/admin/masters/models');
  };

  const toggleYear = (year: number) => {
    setForm((prev) => {
      const next = prev.modelYears.includes(year)
        ? prev.modelYears.filter((y) => y !== year)
        : [...prev.modelYears, year];
      return { ...prev, modelYears: next };
    });
  };

  const filteredMakes = sampleMakes.filter((mk) =>
    mk.nameEn.toLowerCase().includes(makeFilter.toLowerCase())
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800"
    >
      <Link
        to="/admin/masters/models"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Model' : 'Add Model'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="nameEn" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
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
          <label htmlFor="nameAr" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
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
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Associated Make
          </label>
          <input
            type="text"
            placeholder="Search make..."
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          <select
            value={form.makeId}
            onChange={(e) => setForm({ ...form, makeId: Number(e.target.value) })}
            required
            className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Make</option>
            {filteredMakes.map((mk) => (
              <option key={mk.id} value={mk.id}>
                {mk.nameEn}
              </option>
            ))}
          </select>
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
            {sampleVehicleTypes.map((vt) => (
              <option key={vt.id} value={vt.id}>
                {vt.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Supported Model Years
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {sampleModelYears.map((y) => {
              const checked = form.modelYears.includes(y);
              return (
                <label key={y} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleYear(y)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  />
                  {y}
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/models')}
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

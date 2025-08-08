import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleCategories, sampleVehicleTypes } from './mastersData';

export default function AdminCategoryFormPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(categoryId);

  const [form, setForm] = useState({
    name: '',
    description: '',
    vehicleTypeId: '' as any,
    active: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const existing = sampleCategories.find((c) => c.id === Number(categoryId));
      if (existing) {
        setForm({
          name: existing.name,
          description: existing.description || '',
          vehicleTypeId: existing.vehicleTypeId,
          active: existing.active,
        });
      }
    }
  }, [isEdit, categoryId]);

  const validate = () => {
    const exists = sampleCategories.some(
      (c) => c.name.toLowerCase() === form.name.toLowerCase() && (!isEdit || c.id !== Number(categoryId))
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
    navigate('/admin/masters/categories');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800"
    >
      <Link
        to="/admin/masters/categories"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Category' : 'Add Category'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
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
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Is Active</label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/categories')}
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

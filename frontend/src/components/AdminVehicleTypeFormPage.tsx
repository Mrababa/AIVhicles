import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleVehicleTypes } from './mastersData';

export default function AdminVehicleTypeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    code: '',
    active: true,
  });
  const [errors, setErrors] = useState<{ nameEn?: string; code?: string }>({});

  useEffect(() => {
    if (isEdit) {
      const existing = sampleVehicleTypes.find((t) => t.id === Number(id));
      if (existing) {
        setForm({
          nameEn: existing.nameEn,
          nameAr: existing.nameAr,
          code: existing.code,
          active: existing.active,
        });
      }
    }
  }, [id, isEdit]);

  const validate = () => {
    const errs: { nameEn?: string; code?: string } = {};
    const lowerName = form.nameEn.toLowerCase();
    const lowerCode = form.code.toLowerCase();
    const nameExists = sampleVehicleTypes.some(
      (v) => v.nameEn.toLowerCase() === lowerName && (!isEdit || v.id !== Number(id))
    );
    if (nameExists) errs.nameEn = 'Name must be unique';
    const codeExists = sampleVehicleTypes.some(
      (v) => v.code.toLowerCase() === lowerCode && (!isEdit || v.id !== Number(id))
    );
    if (codeExists) errs.code = 'Code must be unique';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/admin/masters/vehicle-types');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800"
    >
      <Link
        to="/admin/masters/vehicle-types"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">
        {isEdit ? 'Edit Vehicle Type' : 'Add Vehicle Type'}
      </h1>
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
          {errors.nameEn && <p className="mt-1 text-xs text-red-600">{errors.nameEn}</p>}
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
          <label htmlFor="code" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Code
          </label>
          <input
            id="code"
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
            disabled={isEdit}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm disabled:bg-slate-100 disabled:dark:bg-slate-700"
          />
          <p className="mt-1 text-xs text-slate-500">
            A unique, lowercase system identifier (e.g., 'light_vehicle'). Cannot be changed after creation.
          </p>
          {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Is Active
          </label>
          <ToggleSwitch enabled={form.active} onChange={(v) => setForm({ ...form, active: v })} />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/masters/vehicle-types')}
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

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import { sampleWMIs, sampleMakes, sampleVehicleTypes } from './mastersData';

export default function AdminWmiFormPage() {
  const { wmiId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(wmiId);

  const [form, setForm] = useState({
    code: '',
    makeId: '',
    country: '',
    vehicleTypes: [] as number[],
    active: true,
  });
  const [errors, setErrors] = useState<{ code?: string }>({});

  useEffect(() => {
    if (isEdit) {
      const existing = sampleWMIs.find((w) => w.id === Number(wmiId));
      if (existing) {
        setForm({
          code: existing.code,
          makeId: String(existing.makeId),
          country: existing.country,
          vehicleTypes: existing.vehicleTypes || [],
          active: existing.active,
        });
      }
    }
  }, [wmiId, isEdit]);

  const validate = () => {
    const errs: { code?: string } = {};
    const codeVal = form.code.trim();
    if (!/^[A-Za-z0-9]{3}$/.test(codeVal)) {
      errs.code = 'Code must be exactly 3 alphanumeric characters';
    }
    const exists = sampleWMIs.some(
      (w) => w.code.toLowerCase() === codeVal.toLowerCase() && (!isEdit || w.id !== Number(wmiId))
    );
    if (exists) errs.code = 'Code must be unique';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate('/admin/masters/wmi');
  };

  const toggleVehicleType = (id: number) => {
    setForm((f) => {
      const exists = f.vehicleTypes.includes(id);
      return {
        ...f,
        vehicleTypes: exists ? f.vehicleTypes.filter((v) => v !== id) : [...f.vehicleTypes, id],
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
      <Link
        to="/admin/masters/wmi"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit WMI' : 'Add WMI'}</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Code
          </label>
          <input
            id="code"
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
            required
            maxLength={3}
            disabled={isEdit}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm disabled:bg-slate-100 disabled:dark:bg-slate-700"
          />
          <p className="mt-1 text-xs text-slate-500">
            The 3-character World Manufacturer Identifier. Cannot be changed after creation.
          </p>
          {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
        </div>
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Associated Make
          </label>
          <select
            id="make"
            value={form.makeId}
            onChange={(e) => setForm({ ...form, makeId: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Make</option>
            {sampleMakes
              .filter((m) => m.active)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nameEn}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Country
          </label>
          <input
            id="country"
            type="text"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          />
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
            onClick={() => navigate('/admin/masters/wmi')}
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

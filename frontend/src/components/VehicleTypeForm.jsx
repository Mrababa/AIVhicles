import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sampleVehicleTypes } from './mastersData';

/**
 * Form for creating or editing a vehicle type.
 */
export default function VehicleTypeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    code: '',
    active: true,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/masters/vehicle-types');
  };

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {isEdit ? 'Edit Vehicle Type' : 'Add Vehicle Type'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name (EN)</label>
          <input
            type="text"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Name (AR)</label>
          <input
            type="text"
            dir="rtl"
            value={form.nameAr}
            onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Code</label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Is Active</label>
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/masters/vehicle-types')}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

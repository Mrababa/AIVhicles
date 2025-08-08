import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ToggleSwitch from './ToggleSwitch';
import {
  sampleTrims,
  sampleModels,
  sampleModelYearMasters,
  sampleTransmissions,
  sampleEngineSizes,
  sampleBodyTypes,
  sampleVehicleTypes,
} from './mastersData';

export default function AdminTrimFormPage() {
  const { trimId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(trimId);

  const [form, setForm] = useState({
    nameEn: '',
    nameAr: '',
    modelId: '',
    year: '',
    vehicleTypeId: 0,
    transmissionId: '',
    engineSizeId: '',
    bodyTypeId: '',
    active: true,
  });

  useEffect(() => {
    if (isEdit) {
      const existing = sampleTrims.find((t) => t.id === Number(trimId));
      if (existing) {
        setForm({
          nameEn: existing.nameEn,
          nameAr: existing.nameAr,
          modelId: String(existing.modelId),
          year: String(existing.year),
          vehicleTypeId: existing.vehicleTypeId,
          transmissionId: existing.transmissionId ? String(existing.transmissionId) : '',
          engineSizeId: existing.engineSizeId ? String(existing.engineSizeId) : '',
          bodyTypeId: existing.bodyTypeId ? String(existing.bodyTypeId) : '',
          active: existing.active,
        });
      }
    }
  }, [trimId, isEdit]);

  useEffect(() => {
    if (form.modelId) {
      const model = sampleModels.find((m) => m.id === Number(form.modelId));
      if (model) {
        setForm((f) => ({ ...f, vehicleTypeId: model.vehicleTypeId }));
      }
    } else {
      setForm((f) => ({ ...f, vehicleTypeId: 0 }));
    }
  }, [form.modelId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/masters/trims');
  };

  const vehicleTypeName = sampleVehicleTypes.find((v) => v.id === form.vehicleTypeId)?.nameEn || '';

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
      <Link
        to="/admin/masters/trims"
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
      >
        <ChevronLeftIcon className="mr-1 h-5 w-5" /> Back
      </Link>
      <h1 className="mb-6 text-2xl font-bold">{isEdit ? 'Edit Trim' : 'Add Trim'}</h1>
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
          <label htmlFor="model" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Associated Model
          </label>
          <select
            id="model"
            value={form.modelId}
            onChange={(e) => setForm({ ...form, modelId: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Model</option>
            {sampleModels.filter((m) => m.active).map((m) => (
              <option key={m.id} value={m.id}>
                {m.nameEn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Year
          </label>
          <select
            id="year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Year</option>
            {sampleModelYearMasters.filter((y) => y.active).map((y) => (
              <option key={y.id} value={y.year}>
                {y.year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Vehicle Type
          </label>
          <input
            type="text"
            value={vehicleTypeName}
            disabled
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm disabled:bg-slate-100 disabled:dark:bg-slate-700"
          />
        </div>
        <div>
          <label htmlFor="transmission" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Transmission
          </label>
          <select
            id="transmission"
            value={form.transmissionId}
            onChange={(e) => setForm({ ...form, transmissionId: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Transmission</option>
            {sampleTransmissions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="engine" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Engine Size
          </label>
          <select
            id="engine"
            value={form.engineSizeId}
            onChange={(e) => setForm({ ...form, engineSizeId: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Engine Size</option>
            {sampleEngineSizes.map((e) => (
              <option key={e.id} value={e.id}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bodyType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Body Type
          </label>
          <select
            id="bodyType"
            value={form.bodyTypeId}
            onChange={(e) => setForm({ ...form, bodyTypeId: e.target.value })}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-700 sm:text-sm"
          >
            <option value="">Select Body Type</option>
            {sampleBodyTypes.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nameEn}
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
            onClick={() => navigate('/admin/masters/trims')}
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

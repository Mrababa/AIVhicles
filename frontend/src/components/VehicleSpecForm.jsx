import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  getSpecification,
  createSpecification,
  updateSpecification,
} from '../services/specService';

/**
 * Form for creating or editing a vehicle specification.
 */
export default function VehicleSpecForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  // Specification object bound to the form fields. This structure mirrors
  // the payload expected by the backend specification API.
  const [spec, setSpec] = useState({
    make: '',
    model: '',
    trim: '',
    year: '',
    region: '',
    vinPattern: '',
    displacementL: '',
    horsepower: '',
  });
  const [activeTab, setActiveTab] = useState('core');

  // When editing an existing record, fetch its data so the form is populated
  // with current values. Creating a new spec skips this step.
  useEffect(() => {
    if (isEdit) {
      // Load existing specification details from the API when editing.
      getSpecification(id).then((data) => setSpec(data));
    }
  }, [id, isEdit]);

  // Generic field updater used for all inputs in both tabs.
  function handleChange(e) {
    setSpec({ ...spec, [e.target.name]: e.target.value });
  }

  // Persist the specification using the appropriate service call. The backend
  // is expected to handle creation vs. update and return validation errors if
  // any fields are invalid.
  async function handleSubmit(status) {
    // Prepare payload and call appropriate service method based on mode.
    const payload = { ...spec, status };
    if (isEdit) {
      await updateSpecification(id, payload);
    } else {
      await createSpecification(payload);
    }
    navigate('/admin/specs');
  }

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {isEdit ? 'Edit' : 'Add'} Specification
          </h1>
          <Link to="/admin/specs" className="text-sm text-indigo-600">
            &larr; Back to list
          </Link>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handleSubmit('DRAFT')}
            className="rounded-lg bg-slate-200 px-4 py-2 font-medium hover:bg-slate-300"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit('PUBLISHED')}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <nav className="w-full border-b md:w-48 md:border-b-0 md:border-r">
          <ul>
            <TabButton id="core" active={activeTab} onClick={setActiveTab}>
              Core Info
            </TabButton>
            <TabButton id="power" active={activeTab} onClick={setActiveTab}>
              Powertrain
            </TabButton>
          </ul>
        </nav>
        <div className="flex-1 p-4">
          {activeTab === 'core' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Make *</label>
                <input
                  name="make"
                  value={spec.make}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Model *</label>
                <input
                  name="model"
                  value={spec.model}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Trim *</label>
                <input
                  name="trim"
                  value={spec.trim}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Year *</label>
                <input
                  name="year"
                  type="number"
                  value={spec.year}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Region *</label>
                <input
                  name="region"
                  value={spec.region}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">VIN Pattern</label>
                <input
                  name="vinPattern"
                  value={spec.vinPattern}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
            </div>
          )}

          {activeTab === 'power' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Displacement (L)</label>
                <input
                  name="displacementL"
                  value={spec.displacementL}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Horsepower</label>
                <input
                  name="horsepower"
                  value={spec.horsepower}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ id, active, onClick, children }) {
  const isActive = id === active;
  return (
    <li>
      <button
        className={`w-full px-4 py-2 text-left text-sm ${
          isActive ? 'bg-slate-200 font-medium' : 'hover:bg-slate-100'
        }`}
        onClick={() => onClick(id)}
      >
        {children}
      </button>
    </li>
  );
}

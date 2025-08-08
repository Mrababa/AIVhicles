import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleMakes } from './mastersData';

/**
 * Dashboard listing all master data entities.
 * Each card links to the management page for that entity.
 */
export default function MastersDashboard() {
  const navigate = useNavigate();

  const entities = [
    {
      key: 'makes',
      name: 'Makes',
      description: 'Vehicle manufacturers',
      count: sampleMakes.length,
      enabled: true,
    },
    {
      key: 'models',
      name: 'Models',
      description: 'Vehicle models',
      count: 0,
      enabled: false,
    },
    {
      key: 'body-types',
      name: 'Body Types',
      description: 'Vehicle body styles',
      count: 0,
      enabled: false,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Masters
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entities.map((entity) => (
          <div
            key={entity.key}
            onClick={() => entity.enabled && navigate(`/admin/masters/${entity.key}`)}
            className={`rounded-lg border p-4 shadow-sm transition-colors ${
              entity.enabled
                ? 'cursor-pointer bg-white hover:bg-slate-50'
                : 'cursor-not-allowed bg-slate-100 text-slate-400'
            }`}
          >
            <div className="text-lg font-semibold">{entity.name}</div>
            <div className="mt-1 text-sm">{entity.description}</div>
            <div className="mt-4 text-2xl font-bold">{entity.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

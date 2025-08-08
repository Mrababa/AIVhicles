import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layers as LayersIcon } from 'lucide-react';

/**
 * Dashboard listing all master data entities.
 * Each card links to the management page for that entity.
 */
export default function MastersDashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  const entities = [
    {
      key: 'makes',
      name: 'Makes',
      description: 'Vehicle manufacturers',
      enabled: true,
    },
    {
      key: 'models',
      name: 'Models',
      description: 'Specific vehicle models',
      enabled: true,
    },
    {
      key: 'vehicle-types',
      name: 'Vehicle Types',
      description: 'e.g., Light, Motorcycle, EV',
      enabled: true,
    },
    {
      key: 'trims',
      name: 'Trims',
      description: 'Model variants and levels',
      enabled: true,
    },
    {
      key: 'body-types',
      name: 'Body Types',
      description: 'e.g., SUV, Sedan, Coupe',
      enabled: true,
    },
    {
      key: 'model-years',
      name: 'Model Years',
      description: 'Manage active model years',
      enabled: true,
    },
    {
      key: 'engine-sizes',
      name: 'Engine Sizes',
      description: 'Engine displacement info',
      enabled: true,
    },
    {
      key: 'transmissions',
      name: 'Transmissions',
      description: 'Transmission types',
      enabled: true,
    },
    {
      key: 'regions',
      name: 'Regions',
      description: 'Geographical markets',
      enabled: true,
    },
    {
      key: 'doors',
      name: 'Doors',
      description: 'Number of doors',
      enabled: true,
    },
    {
      key: 'seats',
      name: 'Seats',
      description: 'Number of seats',
      enabled: true,
    },
    {
      key: 'cylinders',
      name: 'Cylinders',
      description: 'Engine cylinder counts',
      enabled: true,
    },
    {
      key: 'axles',
      name: 'Axles',
      description: 'Vehicle axle counts',
      enabled: false,
    },
    {
      key: 'wmi',
      name: 'WMI',
      description: 'World Manufacturer Identifiers',
      enabled: true,
    },
    {
      key: 'mileage-labels',
      name: 'Mileage Labels',
      description: 'e.g., MPG, KM/L',
      enabled: false,
    },
    {
      key: 'categories',
      name: 'Categories',
      description: 'e.g., Passenger, Commercial',
      enabled: true,
    },
    {
      key: 'fuel-types',
      name: 'Fuel Types',
      description: 'e.g., Petrol, Diesel, EV',
      enabled: true,
    },
    {
      key: 'depreciations',
      name: 'Depreciations',
      description: 'Depreciation rate rules',
      enabled: true,
    },
    {
      key: 'drive-trains',
      name: 'Drive Trains',
      description: 'e.g., FWD, AWD',
      enabled: true,
    },
  ];

  useEffect(() => {
    entities.forEach((entity) => {
      axios
        .get(`/api/${entity.key}`)
        .then((res) => {
          const value = Array.isArray(res.data)
            ? res.data.length
            : res.data?.length ?? res.data?.count ?? res.data?.total ?? 0;
          setCounts((prev) => ({ ...prev, [entity.key]: value }));
        })
        .catch(() => {
          setCounts((prev) => ({ ...prev, [entity.key]: 0 }));
        });
    });
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Masters
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entities.map((entity) => (
          <div
            key={entity.key}
            onClick={() => entity.enabled && navigate(`/admin/masters/${entity.key}`)}
            className={`rounded-lg bg-white p-6 shadow-md transition-all duration-300 dark:bg-slate-800 ${
              entity.enabled
                ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl'
                : 'cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {entity.name}
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {entity.description}
                </div>
              </div>
              <LayersIcon className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
              {counts[entity.key] ?? 0}
            </div>
            <div className="text-xs text-slate-400">records</div>
          </div>
        ))}
      </div>
    </div>
  );
}


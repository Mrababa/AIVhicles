import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleMakes, sampleVehicleTypes } from './mastersData';
import {
  RectangleStackIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

/**
 * Dashboard listing all master data entities.
 * Each card links to the management page for that entity.
 */
export default function MastersDashboard() {
  const navigate = useNavigate();

  const entities = [
    {
      key: 'vehicle-types',
      name: 'Vehicle Types',
      description: 'Vehicle categories',
      count: sampleVehicleTypes.length,
      enabled: true,
      icon: RectangleStackIcon,
    },
    {
      key: 'makes',
      name: 'Makes',
      description: 'Vehicle manufacturers',
      count: sampleMakes.length,
      enabled: true,
      icon: BuildingOffice2Icon,
    },
    {
      key: 'models',
      name: 'Models',
      description: 'Vehicle models',
      count: 0,
      enabled: false,
      icon: RectangleStackIcon,
    },
    {
      key: 'body-types',
      name: 'Body Types',
      description: 'Vehicle body styles',
      count: 0,
      enabled: false,
      icon: RectangleStackIcon,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Masters
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entities.map((entity) => {
          const Icon = entity.icon;
          return (
            <div
              key={entity.key}
              onClick={() =>
                entity.enabled && navigate(`/admin/masters/${entity.key}`)
              }
              className={`rounded-lg bg-white p-4 shadow-md transition transform dark:bg-slate-800 ${
                entity.enabled
                  ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl'
                  : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{entity.name}</div>
                  <div className="mt-1 text-sm">{entity.description}</div>
                </div>
                {Icon && <Icon className="h-8 w-8 text-slate-400" />}
              </div>
              <div className="mt-4 text-2xl font-bold">{entity.count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

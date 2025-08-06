import React from 'react';
import { Link } from 'react-router-dom';

/** Card displaying summary information for a vehicle */
export default function VehicleCard({ vehicle }) {
  const {
    id,
    imageUrl,
    bodyType,
    make,
    model,
    year,
    description,
    marketValue,
  } = vehicle;

  return (
    <div className="group overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md transition transform hover:-translate-y-1 hover:shadow-xl">
      <img
        src={imageUrl || 'https://via.placeholder.com/300x200'}
        alt={`${make} ${model}`}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <div className="mb-1 text-sm text-slate-500">{bodyType}</div>
        <div className="font-semibold">
          {make} {model} {year}
        </div>
        {description && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 truncate">{description}</p>
        )}
        {marketValue && (
          <div className="mt-2 text-sm font-medium">${marketValue}</div>
        )}
        <Link
          to={`/vehicles/${id}`}
          className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

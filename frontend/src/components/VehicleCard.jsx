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
    <div className="bg-white dark:bg-slate-800 rounded shadow overflow-hidden hover:shadow-lg transition-shadow">
      <div className="overflow-hidden">
        <img
          src={imageUrl || 'https://via.placeholder.com/300x200'}
          alt={`${make} ${model}`}
          className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-slate-500 mb-1">{bodyType}</div>
        <div className="font-semibold">
          {make} {model} {year}
        </div>
        {description && (
          <p className="text-sm text-slate-600 mt-1 truncate">{description}</p>
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

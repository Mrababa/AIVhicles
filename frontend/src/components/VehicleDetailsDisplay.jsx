import React from 'react';

/**
 * Shows details about the identified vehicle.
 */
export default function VehicleDetailsDisplay({ vehicle }) {
  if (!vehicle) return null;
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
      <p className="mb-2">
        {vehicle.make} {vehicle.model} {vehicle.year} - {vehicle.bodyType}
      </p>
      <p className="mb-4">Estimated Market Value: {vehicle.marketValueAED} AED</p>
      <p className="mb-4">{vehicle.description}</p>
      <ul className="list-disc ml-5">
        {Object.entries(vehicle.specs || {}).map(([key, val]) => (
          <li key={key}>
            <span className="font-medium">{key}: </span>
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
}


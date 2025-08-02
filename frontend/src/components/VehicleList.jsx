import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Displays vehicles retrieved from the backend API.
 */
export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8080/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVehicles(res.data));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <ul className="space-y-2">
        {vehicles.map((v) => (
          <li key={v.id} className="border p-2 rounded bg-white dark:bg-gray-800">
            {v.make} {v.model} ({v.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      <ul className="space-y-2">
        {vehicles.map((v) => (
          <li key={v.id} className="border p-2 rounded">
            {v.make} {v.model} ({v.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

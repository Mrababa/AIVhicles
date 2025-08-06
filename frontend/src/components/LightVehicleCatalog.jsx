import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Light Vehicles Catalog Page with filtering, sorting, search and pagination.
 */
export default function LightVehicleCatalog() {
  const [vehicles, setVehicles] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    driveType: '',
    sort: 'year_desc',
    page: 1,
    limit: 12,
    search: ''
  });

  useEffect(() => {
    const params = { ...filters, category: 'light' };
    axios
      .get('http://localhost:8080/api/vehicles/catalog', { params })
      .then((res) => {
        setVehicles(res.data.data);
        setTotal(res.data.total);
      });
  }, [filters]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const nextPage = () => {
    if (filters.page * filters.limit < total) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const prevPage = () => {
    if (filters.page > 1) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Light Vehicles Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input name="search" value={filters.search} onChange={handleInput} placeholder="Search" className="border p-2 rounded" />
        <input name="make" value={filters.make} onChange={handleInput} placeholder="Make" className="border p-2 rounded" />
        <input name="model" value={filters.model} onChange={handleInput} placeholder="Model" className="border p-2 rounded" />
        <select name="fuelType" value={filters.fuelType} onChange={handleInput} className="border p-2 rounded">
          <option value="">All Fuels</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>
        <select name="transmission" value={filters.transmission} onChange={handleInput} className="border p-2 rounded">
          <option value="">All Transmissions</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="CVT">CVT</option>
        </select>
        <select name="bodyType" value={filters.bodyType} onChange={handleInput} className="border p-2 rounded">
          <option value="">All Body Types</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="SUV">SUV</option>
          <option value="Pickup">Light Pickup</option>
          <option value="Crossover">Crossover</option>
        </select>
        <select name="driveType" value={filters.driveType} onChange={handleInput} className="border p-2 rounded">
          <option value="">All Drive Types</option>
          <option value="FWD">FWD</option>
          <option value="RWD">RWD</option>
          <option value="AWD">AWD</option>
        </select>
        <select name="sort" value={filters.sort} onChange={handleInput} className="border p-2 rounded">
          <option value="year_desc">Year: Newest</option>
          <option value="year_asc">Year: Oldest</option>
          <option value="make_asc">Make A-Z</option>
          <option value="price_asc">Price Low-High</option>
          <option value="price_desc">Price High-Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="border rounded p-2 bg-white dark:bg-slate-800">
            <img src={v.imageUrl || 'https://via.placeholder.com/150'} alt={`${v.make} ${v.model}`} className="mb-2 w-full h-32 object-cover" />
            <div className="font-semibold">{v.year} {v.make} {v.model}</div>
            <div className="text-sm">{v.bodyType} · {v.transmission} · {v.fuelType}</div>
            {v.price && <div className="text-sm mt-1">${v.price}</div>}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={prevPage} disabled={filters.page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <div>Page {filters.page}</div>
        <button onClick={nextPage} disabled={filters.page * filters.limit >= total} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

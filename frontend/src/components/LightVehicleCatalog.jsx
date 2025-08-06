import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * Light Vehicles Catalog Page with filtering, sorting, search and pagination.
 */
export default function LightVehicleCatalog() {
  const initialFilters = {
    make: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    driveType: '',
    search: '',
  };

  const [vehicles, setVehicles] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({
    ...initialFilters,
    page: 1,
    limit: 12,
  });
  const [sortOrder, setSortOrder] = useState('year_desc');

  useEffect(() => {
    const params = { ...activeFilters, category: 'light' };
    axios
      .get('http://localhost:8080/api/vehicles/catalog', { params })
      .then((res) => {
        setVehicles(res.data.data);
        setTotal(res.data.total);
      });
  }, [activeFilters]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setActiveFilters((prev) => ({ ...prev, ...filters, page: 1 }));
  };

  const handleClear = () => {
    setFilters(initialFilters);
    setActiveFilters((prev) => ({ ...prev, ...initialFilters, page: 1 }));
    setSortOrder('year_desc');
  };

  const nextPage = () => {
    if (activeFilters.page * activeFilters.limit < total) {
      setActiveFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const prevPage = () => {
    if (activeFilters.page > 1) {
      setActiveFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  const sortedVehicles = useMemo(() => {
    const arr = [...vehicles];
    switch (sortOrder) {
      case 'year_asc':
        return arr.sort((a, b) => a.year - b.year);
      case 'make_asc':
        return arr.sort((a, b) => a.make.localeCompare(b.make));
      case 'make_desc':
        return arr.sort((a, b) => b.make.localeCompare(a.make));
      case 'year_desc':
      default:
        return arr.sort((a, b) => b.year - a.year);
    }
  }, [vehicles, sortOrder]);
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Light Vehicles Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            name="search"
            value={filters.search}
            onChange={handleInput}
            placeholder="Search by model, brand, etc."
            className="border p-2 pl-8 rounded w-full"
          />
        </div>
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
      </div>
      <div className="flex gap-2 mb-6">
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
        <button onClick={handleClear} className="px-4 py-2 border rounded">Clear Filters</button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>Showing {total} results</div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="year_desc">Year: Newest First</option>
          <option value="year_asc">Year: Oldest First</option>
          <option value="make_asc">Make: A-Z</option>
          <option value="make_desc">Make: Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedVehicles.length === 0 ? (
          <div className="col-span-full flex flex-col items-center py-12">
            <MagnifyingGlassIcon className="h-16 w-16 text-slate-400" />
            <h2 className="mt-4 text-xl font-semibold">No Vehicles Found</h2>
            <p className="text-slate-500">Try adjusting your search criteria or clearing the filters.</p>
          </div>
        ) : (
          sortedVehicles.map((v) => (
            <div key={v.id} className="border rounded p-2 bg-white dark:bg-slate-800">
              <img
                src={v.imageUrl || 'https://via.placeholder.com/150'}
                alt={`${v.make} ${v.model}`}
                className="mb-2 w-full h-32 object-cover"
              />
              <div className="font-semibold">{v.year} {v.make} {v.model}</div>
              <div className="text-sm">{v.bodyType} · {v.transmission} · {v.fuelType}</div>
              {v.price && <div className="text-sm mt-1">${v.price}</div>}
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={activeFilters.page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <div>Page {activeFilters.page}</div>
        <button
          onClick={nextPage}
          disabled={activeFilters.page * activeFilters.limit >= total}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

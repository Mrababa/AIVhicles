import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CatalogHeader from './CatalogHeader.jsx';
import Footer from './Footer.tsx';
import Spinner from './Spinner.jsx';
import VehicleCard from './VehicleCard.jsx';
import { MAKES, YEARS, CATEGORIES } from '../constants.ts';

/**
 * Main vehicle catalog page with advanced search and filtering. Queries
 * the backend `/api/vehicles/catalog` endpoint with selected filters and
 * displays the results. The backend should support the same query params
 * used in `fetchVehicles`.
 */
export default function VehicleCatalog() {
  const initialFilters = { search: '', make: '', year: '', category: '' };
  const [filters, setFilters] = useState(initialFilters);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('year_desc');

  const fetchVehicles = async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      // Query backend with current filter params. The API should return a list
      // of vehicles matching the criteria.
      const res = await axios.get('http://localhost:8080/api/vehicles/catalog', { params });
      const data = res.data.data || res.data;
      setVehicles(data);
    } catch (err) {
      setError('Failed to fetch vehicle data...');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles(initialFilters);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVehicles(filters);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    fetchVehicles(initialFilters);
  };

  const sortedVehicles = useMemo(() => {
    const arr = [...vehicles];
    switch (sort) {
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
  }, [vehicles, sort]);

  const resultCount = vehicles.length;

  return (
    <>
      <CatalogHeader />
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200">
        <section className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Vehicle Catalog</h1>
        </section>

        <form
          onSubmit={handleSearch}
          className="sticky top-16 z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-white dark:bg-slate-800 rounded-xl shadow-md p-6"
        >
          <div className="relative md:col-span-2">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="e.g., Land Cruiser"
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
              type="text"
            />
          </div>
          <select
            name="make"
            value={filters.make}
            onChange={handleChange}
            className="rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Makes</option>
            {MAKES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            name="year"
            value={filters.year}
            onChange={handleChange}
            className="rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex gap-3 md:col-span-5 justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 rounded-md bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-500"
            >
              Clear
            </button>
          </div>
        </form>

        <main className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="flex flex-col items-center">
              <Spinner />
              <p className="mt-4">Loading vehicles...</p>
            </div>
          ) : error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </div>
          ) : resultCount === 0 ? (
            <div className="flex flex-col items-center py-12">
              <MagnifyingGlassIcon className="h-16 w-16 text-slate-400" />
              <h2 className="mt-4 text-xl font-semibold">No Vehicles Found</h2>
              <p className="text-slate-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {resultCount} {resultCount === 1 ? 'vehicle' : 'vehicles'}
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="rounded-md border border-slate-300 dark:border-slate-600 dark:bg-slate-700 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="year_desc">Year: Newest First</option>
                    <option value="year_asc">Year: Oldest First</option>
                    <option value="make_asc">Make: A-Z</option>
                    <option value="make_desc">Make: Z-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}


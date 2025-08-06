import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import Spinner from './Spinner.jsx';
import VehicleCard from './VehicleCard.jsx';
import { MAKES, YEARS, CATEGORIES } from '../constants.ts';

/** Main vehicle catalog page with advanced search and filtering */
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
      <Header />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-200 pt-20">
        <section className="max-w-7xl mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Vehicle Catalog</h1>
          <p className="text-slate-600 dark:text-slate-400">Search, filter, and browse...</p>
        </section>

        <div className="sticky top-20 z-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="relative md:col-span-2">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="e.g., Land Cruiser"
              className="w-full border rounded py-2 pl-8"
              type="text"
            />
          </div>
          <select
            name="make"
            value={filters.make}
            onChange={handleChange}
            className="border rounded py-2 px-2"
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
            className="border rounded py-2 px-2"
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
            className="border rounded py-2 px-2"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex gap-2 md:col-span-5">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              Search
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded"
            >
              Clear
            </button>
          </div>
        </form>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <p className="mt-4">Loading vehicles...</p>
          </div>
        ) : error ? (
          <div className="border border-red-300 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 p-4 rounded">
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
            <div className="flex justify-between items-center mb-4">
              <div>
                Showing {resultCount} {resultCount === 1 ? 'result' : 'results'}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border rounded py-2 px-2"
                >
                  <option value="year_desc">Year: Newest First</option>
                  <option value="year_asc">Year: Oldest First</option>
                  <option value="make_asc">Make: A-Z</option>
                  <option value="make_desc">Make: Z-A</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />)
              )}
            </div>
          </div>
        )}
        </main>
      </div>
      <Footer />
    </>
  );
}

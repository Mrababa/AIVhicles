import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ContentContext } from '../contexts/ContentContext.tsx';

/**
 * Admin interface for editing pricing plan content.
 */
export default function AdminPlans() {
  const { isAuthenticated } = useAuth();
  const { content, setContent } = useContext(ContentContext);
  const [pricingTiers, setPricingTiers] = useState(() =>
    content.pricingTiers.map((t) => ({
      ...t,
      features: t.features.join(', '),
    }))
  );
  const [isSaved, setIsSaved] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (index, field, value) => {
    setPricingTiers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = pricingTiers.map((t) => ({
      ...t,
      features: t.features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
    }));
    setContent({ ...content, pricingTiers: updated });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold">Plans Management</h1>
        <div className="flex items-center space-x-4">
          {isSaved && <p className="text-green-600">Plans saved successfully!</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow space-y-4"
          >
            <h2 className="text-xl font-bold">{tier.name}</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Name
              </label>
              <input
                type="text"
                value={tier.name}
                onChange={(e) => handleChange(idx, 'name', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Price
              </label>
              <input
                type="text"
                placeholder="$49 or Custom"
                value={tier.price}
                onChange={(e) => handleChange(idx, 'price', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </label>
              <textarea
                rows={3}
                value={tier.description}
                onChange={(e) => handleChange(idx, 'description', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Features (comma separated)
              </label>
              <textarea
                rows={4}
                value={tier.features}
                onChange={(e) => handleChange(idx, 'features', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                CTA Text
              </label>
              <input
                type="text"
                value={tier.cta}
                onChange={(e) => handleChange(idx, 'cta', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <input
                id={`popular-${idx}`}
                type="checkbox"
                checked={tier.popular}
                onChange={(e) => handleChange(idx, 'popular', e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor={`popular-${idx}`}
                className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
              >
                Mark as Popular
              </label>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import AdminHeader from './AdminHeader.jsx';

/**
 * Admin interface for managing pricing plans.
 */
export default function AdminPlans() {
  const { isAuthenticated } = useAuth();
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: '',
    price: '',
    billingPeriod: 'month',
    features: '',
    ctaText: '',
    visible: true,
  });

  useEffect(() => {
    if (isAuthenticated) {
      axios.get('/api/plans').then((res) => setPlans(res.data));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      billingPeriod: form.billingPeriod,
      features: form.features.split(',').map((s) => s.trim()),
      ctaText: form.ctaText,
      visible: form.visible,
    };
    if (form.id) {
      axios.put(`/api/plans/${form.id}`, payload).then((res) => {
        setPlans((prev) => prev.map((p) => (p.id === form.id ? res.data : p)));
        setForm({ id: null, name: '', price: '', billingPeriod: 'month', features: '', ctaText: '', visible: true });
      });
    } else {
      axios.post('/api/plans', payload).then((res) => {
        setPlans((prev) => [...prev, res.data]);
        setForm({ id: null, name: '', price: '', billingPeriod: 'month', features: '', ctaText: '', visible: true });
      });
    }
  };

  const editPlan = (plan) => {
    setForm({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      billingPeriod: plan.billingPeriod,
      features: plan.features.join(', '),
      ctaText: plan.ctaText,
      visible: plan.visible,
    });
  };

  const deletePlan = (id) => {
    axios.delete(`/api/plans/${id}`).then(() => {
      setPlans((prev) => prev.filter((p) => p.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <AdminHeader />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Plans & Pricing</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-xl">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Plan name"
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-4">
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="Price"
              className="w-1/2 p-2 border rounded"
            />
            <input
              name="billingPeriod"
              value={form.billingPeriod}
              onChange={handleChange}
              required
              placeholder="Billing period"
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <input
            name="features"
            value={form.features}
            onChange={handleChange}
            required
            placeholder="Features (comma separated)"
            className="w-full p-2 border rounded"
          />
          <input
            name="ctaText"
            value={form.ctaText}
            onChange={handleChange}
            required
            placeholder="CTA text"
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="visible"
              checked={form.visible}
              onChange={handleChange}
            />
            <span>Visible</span>
          </label>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            {form.id ? 'Update Plan' : 'Add Plan'}
          </button>
        </form>
        <ul className="mt-8 space-y-4">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="p-4 bg-white dark:bg-slate-800 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm">
                  ${plan.price}/{plan.billingPeriod}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => editPlan(plan)}
                  className="px-2 py-1 text-sm rounded bg-slate-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="px-2 py-1 text-sm rounded bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SimpleHeader from './SimpleHeader.tsx';
import Footer from './Footer.tsx';
import axios from 'axios';

interface Plan {
  id: number;
  name: string;
  price: number;
  billingPeriod: string;
  features: string[];
  ctaText: string;
  visible: boolean;
}

/**
 * Marketing pricing page showing plan cards and feature comparison table.
 */
export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    axios.get('/api/plans/public').then((res) => setPlans(res.data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <SimpleHeader />
      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Flexible Plans for Every Business
          </h1>
          <p className="mt-4 text-lg">
            Choose the plan that fits your needs and scale as you grow.
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
              <div className="mt-6 text-center">
                <span className="text-5xl font-extrabold">${plan.price}</span>
                <span className="text-lg font-medium text-slate-500">/{plan.billingPeriod}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    <span className="ml-3">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="mt-8 inline-block w-full text-center px-4 py-2 rounded-md font-semibold bg-indigo-600 text-white hover:bg-indigo-500"
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}


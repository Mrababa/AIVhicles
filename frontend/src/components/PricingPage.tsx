import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import SimpleHeader from './SimpleHeader.tsx';
import Footer from './Footer.tsx';
import { PRICING_PLANS, PRICING_FEATURES } from '../constants.ts';

/**
 * Marketing pricing page showing plan cards and feature comparison table.
 */
export default function PricingPage() {
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
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg ${
                plan.popular ? 'border-2 border-indigo-500' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold uppercase bg-indigo-500 text-white rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
              <p className="mt-2 text-center">{plan.description}</p>
              <div className="mt-6 text-center">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-lg font-medium text-slate-500">/month</span>
                )}
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
                to={plan.ctaLink}
                className={`mt-8 inline-block w-full text-center px-4 py-2 rounded-md font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600'
                }`}
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* Feature comparison table */}
        <div className="mt-24">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Feature</th>
                  {PRICING_PLANS.map((plan) => (
                    <th key={plan.id} className="px-6 py-3 text-left text-sm font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {PRICING_FEATURES.map((row) => (
                  <tr key={row.feature}>
                    <td className="px-6 py-4 text-sm font-medium">{row.feature}</td>
                    {PRICING_PLANS.map((plan) => {
                      const value = (row as any)[plan.id];
                      return (
                        <td key={plan.id} className="px-6 py-4 text-sm">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <CheckCircleIcon className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircleIcon className="w-5 h-5 text-slate-400" />
                            )
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


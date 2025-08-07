import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SimpleHeader from './SimpleHeader.tsx';
import Footer from './Footer.tsx';
import { ContentContext } from '../contexts/ContentContext.tsx';

/**
 * Marketing pricing page showing plan cards and feature comparison table.
 */
export default function PricingPage() {
  const { content } = useContext(ContentContext);
  const plans = content.pricingTiers;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <SimpleHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Flexible Plans for Every Business
          </h1>
          <p className="mt-4 text-lg">
            Choose the plan that fits your needs and scale as you grow.
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.popular ? 'border-2 border-indigo-600' : ''}`}
            >
              {plan.popular && (
                <span className="mb-4 self-center px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-full">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
              <div className="mt-6 text-center">
                <span className="text-5xl font-extrabold">{plan.price}</span>
              </div>
              <p className="mt-4 text-center text-slate-600 dark:text-slate-300">
                {plan.description}
              </p>
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
                className="mt-8 inline-block w-full text-center px-4 py-2 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}


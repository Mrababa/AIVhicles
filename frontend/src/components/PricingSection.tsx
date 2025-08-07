import React, { useContext } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ContentContext } from '../contexts/ContentContext.tsx';

/**
 * Displays pricing plans from the content context.
 */
export default function PricingSection() {
  const { content } = useContext(ContentContext);
  const plans = content.pricingTiers;

  return (
    <section className="mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">Plans & Pricing</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}


import React from 'react';
import {
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  CurrencyDollarIcon,
  BoltIcon,
  CpuChipIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: MagnifyingGlassIcon,
    title: 'VIN Decoding',
    description: 'Instantly decode and understand any vehicle by its VIN.',
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Damage Estimator',
    description: 'AI-powered estimates for repair costs from images.',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Valuation',
    description: 'Real-time market pricing backed by live data.',
  },
  {
    icon: BoltIcon,
    title: 'Fast Insights',
    description: 'Analyze large fleets in seconds not hours.',
  },
  {
    icon: CpuChipIcon,
    title: 'AI Engine',
    description: 'Leverage modern machine learning for vehicle intelligence.',
  },
  {
    icon: LockClosedIcon,
    title: 'Secure',
    description: 'Your data is encrypted end‑to‑end and never shared.',
  },
];

/**
 * Highlights key platform features in a responsive grid.
 */
export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">Powerful features</h2>
          <p className="mt-4 text-lg">
            Everything you need to manage and understand vehicles at scale.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-8 rounded-xl bg-white shadow text-center flex flex-col items-center"
            >
              <div className="p-3 rounded-full bg-indigo-50">
                <Icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{title}</h3>
              <p className="mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


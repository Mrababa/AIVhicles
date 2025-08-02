import React from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

/**
 * Public about page describing the VehiclesData project.
 */
export default function About() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 text-slate-700 dark:text-slate-300">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">About Us</h1>
        <p className="mb-4">
          VehiclesData provides actionable insights and tools for vehicle enthusiasts and
          developers. Our platform combines data aggregation with modern AI to help
          users understand and work with vehicle information more effectively.
        </p>
        <p>
          Started as a community project, VehiclesData continues to evolve thanks to the
          contributions of passionate developers and auto lovers around the globe.
        </p>
      </main>
      <Footer />
    </>
  );
}

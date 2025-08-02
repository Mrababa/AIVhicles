import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Closing call to action driving users to the catalog.
 */
export default function FinalCTASection() {
  return (
    <section className="my-20 px-4">
      <div className="max-w-4xl mx-auto p-12 text-center text-white rounded-2xl bg-gradient-to-r from-indigo-700 to-teal-600">
        <h2 className="text-4xl font-extrabold">Ready to see it in action?</h2>
        <p className="mt-4 text-lg">Browse our full catalog of vehicle data.</p>
        <Link
          to="/catalog"
          className="inline-block mt-8 px-10 py-4 rounded-md bg-white text-indigo-700 font-semibold shadow"
        >
          Explore Catalog
        </Link>
      </div>
    </section>
  );
}


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContentContext } from '../contexts/ContentContext.tsx';

/**
 * Hero banner introducing the product with CTA buttons.
 */
export default function HeroSection() {
  const { headline, tagline } = useContext(ContentContext);

  return (
    <section className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-800 via-slate-800 to-teal-700 [background-size:200%_200%] animate-background-pan"
      />
      <div className="max-w-4xl mx-auto p-8 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold">{headline}</h1>
        <p className="mt-6 text-lg md:text-xl">{tagline}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/catalog"
            className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-md shadow"
          >
            Explore Catalog
          </Link>
          <Link
            to="/inspector"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-md"
          >
            Try Inspector
          </Link>
        </div>
      </div>
    </section>
  );
}


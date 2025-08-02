import React from 'react';

const logos = [
  'https://placehold.co/150x40?text=Logo1',
  'https://placehold.co/150x40?text=Logo2',
  'https://placehold.co/150x40?text=Logo3',
  'https://placehold.co/150x40?text=Logo4',
  'https://placehold.co/150x40?text=Logo5',
];

const useCases = [
  {
    title: 'Dealerships',
    description: 'Automate listings and accelerate turn‑around on trade‑ins.',
  },
  {
    title: 'Insurance',
    description: 'Speed up claims with instant damage assessments.',
  },
  {
    title: 'Rental Fleets',
    description: 'Monitor fleet condition and plan maintenance proactively.',
  },
];

/**
 * Social proof section showing logos, use‑cases and a key metric.
 */
export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">Trusted across the industry</h2>

        <div className="mt-10 overflow-hidden">
          <div className="flex animate-marquee gap-16 hover:[animation-play-state:paused]">
            {logos.concat(logos).map((logo, idx) => (
              <div key={idx} className="w-48 mx-8 flex items-center justify-center">
                <img src={logo} alt="logo" className="h-10" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {useCases.map((c) => (
            <div key={c.title} className="p-8 rounded-xl bg-white shadow">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p className="mt-2">{c.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 max-w-lg mx-auto p-8 rounded-xl bg-white shadow text-center">
          <p className="text-5xl font-extrabold text-indigo-600">95%</p>
          <p className="mt-4 text-xl font-semibold">customer satisfaction</p>
        </div>
      </div>
    </section>
  );
}


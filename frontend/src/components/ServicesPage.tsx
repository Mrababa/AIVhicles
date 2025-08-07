import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import { IdentificationIcon, CameraIcon, RectangleStackIcon, BanknotesIcon } from './Icons.tsx';
import HeroSection from './HeroSection.tsx';

const services = [
  {
    icon: IdentificationIcon,
    title: 'VIN Decoding API',
    description:
      'Decode any VIN to uncover detailed vehicle specifications, build information, and manufacturing data.',
    link: '/vin-decoder',
    linkText: 'Explore API',
  },
  {
    icon: CameraIcon,
    title: 'AI Vehicle Inspector',
    description:
      'Analyze vehicle images with AI to detect damage and generate comprehensive inspection reports.',
    link: '/inspector',
    linkText: 'Start Inspection',
  },
  {
    icon: RectangleStackIcon,
    title: 'Comprehensive Vehicle Catalog',
    description:
      'Browse a vast database of makes, models, and trims with powerful filtering and search capabilities.',
    link: '/catalog',
    linkText: 'Browse Catalog',
  },
  {
    icon: BanknotesIcon,
    title: 'Vehicle Valuation',
    description:
      'Estimate current market values to price vehicles accurately and confidently.',
    link: '/valuation',
    linkText: 'Check Value',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Header />
      <HeroSection
        short
        title="Our Services"
        subtitle="Discover the suite of tools VehiclesData offers to streamline vehicle research and analysis."
        showCTA={false}
      />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          {/* Services Grid */}
          <section className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all p-6 flex flex-col"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-4">
                  <service.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="flex-grow text-slate-600 dark:text-slate-300">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  {service.linkText} &rarr;
                </Link>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

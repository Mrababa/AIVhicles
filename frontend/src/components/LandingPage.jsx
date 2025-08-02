import React from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  BoltIcon,
  CpuChipIcon,
  SquaresPlusIcon,
  LockClosedIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import DarkModeToggle from './DarkModeToggle.jsx';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-200">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow z-10">
        <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4" aria-label="Main Navigation">
          <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">AIVhicles</Link>
          <ul className="flex flex-col w-full mt-4 space-y-2 md:space-y-0 md:flex-row md:w-auto md:space-x-4 md:mt-0 text-slate-700 dark:text-slate-200">
            <li><a href="#home" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</a></li>
            <li><a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400">Services</a></li>
            <li><a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</a></li>
            <li><a href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400">About</a></li>
            <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a></li>
            <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">Login</Link></li>
            <li><a href="#cta" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sign Up</a></li>
            <li><DarkModeToggle /></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="flex-1">
        <section className="text-center px-4 py-24 bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-900">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-100">Revolutionize Vehicle Intelligence with AI</h1>
          <p className="mb-6 text-lg text-slate-300">Unlock advanced insights and automation for your vehicle data.</p>
          <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded">
            Try Free
          </Link>
        </section>

        {/* Our Services */}
        <section id="services" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded-lg shadow">
              <MagnifyingGlassIcon className="h-12 w-12 text-indigo-500" />
              <h3 className="font-semibold mt-4">VIN Decoding</h3>
              <p className="text-slate-600 dark:text-slate-400">Instantly decode vehicle identification numbers.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded-lg shadow">
              <BookOpenIcon className="h-12 w-12 text-indigo-500" />
              <h3 className="font-semibold mt-4">Vehicle Catalog</h3>
              <p className="text-slate-600 dark:text-slate-400">Access comprehensive vehicle data and specs.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded-lg shadow">
              <WrenchScrewdriverIcon className="h-12 w-12 text-indigo-500" />
              <h3 className="font-semibold mt-4">AI Accident Estimator</h3>
              <p className="text-slate-600 dark:text-slate-400">Quickly estimate damage costs using AI.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded-lg shadow">
              <SparklesIcon className="h-12 w-12 text-indigo-500" />
              <h3 className="font-semibold mt-4">AI Vehicle Reconditioning</h3>
              <p className="text-slate-600 dark:text-slate-400">Enhance vehicle images with smart reconditioning.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded-lg shadow">
              <CurrencyDollarIcon className="h-12 w-12 text-indigo-500" />
              <h3 className="font-semibold mt-4">Vehicle Valuation</h3>
              <p className="text-slate-600 dark:text-slate-400">Receive accurate market valuations in seconds.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="about" className="bg-slate-100 dark:bg-slate-800 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <BoltIcon className="h-12 w-12 text-indigo-500" />
                <h3 className="font-semibold mt-4">Fast & Accurate</h3>
                <p className="text-slate-600 dark:text-slate-400">Get results powered by real-time AI processing.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CpuChipIcon className="h-12 w-12 text-indigo-500" />
                <h3 className="font-semibold mt-4">AI-Powered</h3>
                <p className="text-slate-600 dark:text-slate-400">Advanced algorithms deliver smart insights.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <SquaresPlusIcon className="h-12 w-12 text-indigo-500" />
                <h3 className="font-semibold mt-4">Multiple Services</h3>
                <p className="text-slate-600 dark:text-slate-400">Everything you need in one platform.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <LockClosedIcon className="h-12 w-12 text-indigo-500" />
                <h3 className="font-semibold mt-4">Secure</h3>
                <p className="text-slate-600 dark:text-slate-400">Your data is protected with industry standards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="flex flex-col items-center mb-8 md:mb-0">
              <ArrowUpTrayIcon className="h-12 w-12 text-indigo-500" />
              <p className="mt-2 text-slate-600 dark:text-slate-400">Upload</p>
            </div>
            <span className="text-4xl hidden md:block text-indigo-500" aria-hidden="true">→</span>
            <div className="flex flex-col items-center mb-8 md:mb-0">
              <ChartBarIcon className="h-12 w-12 text-indigo-500" />
              <p className="mt-2 text-slate-600 dark:text-slate-400">Analyze</p>
            </div>
            <span className="text-4xl hidden md:block text-indigo-500" aria-hidden="true">→</span>
            <div className="flex flex-col items-center">
              <CheckCircleIcon className="h-12 w-12 text-teal-500" />
              <p className="mt-2 text-slate-600 dark:text-slate-400">Result</p>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section id="pricing" className="bg-slate-100 dark:bg-slate-800 py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing Preview</h2>
          <div className="max-w-md mx-auto bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-8 rounded shadow text-center">
            <p className="text-xl font-semibold mb-2">Starter Plan</p>
            <p className="text-2xl font-bold mb-4">$19/mo</p>
            <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full mb-4">Free Trial Available</span>
            <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded">
              Start Now
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded shadow">
              <p>"Amazing service that saved us hours of work!"</p>
              <footer className="mt-4 text-slate-600 dark:text-slate-400">— Alex</footer>
            </blockquote>
            <blockquote className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded shadow">
              <p>"The AI estimates are incredibly accurate."</p>
              <footer className="mt-4 text-slate-600 dark:text-slate-400">— Jamie</footer>
            </blockquote>
            <blockquote className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-6 rounded shadow">
              <p>"A must-have tool for any dealership."</p>
              <footer className="mt-4 text-slate-600 dark:text-slate-400">— Sam</footer>
            </blockquote>
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="bg-gradient-to-r from-indigo-700 to-teal-600 text-center py-16 px-4 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your workflow?</h2>
          <Link to="/signup" className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded">
            Sign Up
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">AIVhicles</h3>
            <p className="text-sm">© 2024 AIVhicles</p>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-2">Follow us</p>
            <div className="flex space-x-4 text-xl">
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="LinkedIn">🔗</a>
            </div>
            <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter" className="sr-only">Email</label>
              <input id="newsletter" type="email" placeholder="Email" className="p-2 w-full text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 rounded-l border border-slate-300 dark:border-slate-600" />
              <button className="bg-indigo-600 text-white px-4 rounded-r" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

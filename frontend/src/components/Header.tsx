import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

/**
 * Global site header with sticky behaviour and scroll aware styling.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 z-30 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <nav className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <SparklesIcon className="w-8 h-8" />
          <span className="text-xl font-bold">VehiclesData</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-semibold">
          <Link to="/services" className="hover:text-indigo-600">
            Services
          </Link>
          <Link to="/pricing" className="hover:text-indigo-600">
            Pricing
          </Link>
          <Link to="/about" className="hover:text-indigo-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600">
            Contact Us
          </Link>
          <Link to="/faq" className="hover:text-indigo-600">
            FAQs
          </Link>
          <Link to="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>
    </header>
  );
}


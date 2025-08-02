import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Marketing landing page introducing the application.
 * Uses TailwindCSS for a responsive mobile-first layout.
 */
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 shadow z-10">
        <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4" aria-label="Main Navigation">
          <Link to="/" className="text-2xl font-bold">AIVhicles</Link>
          <ul className="flex flex-col w-full mt-4 space-y-2 md:space-y-0 md:flex-row md:w-auto md:space-x-4 md:mt-0">
            <li><a href="#home" className="hover:text-blue-600">Home</a></li>
            <li><a href="#services" className="hover:text-blue-600">Services</a></li>
            <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
            <li><a href="#about" className="hover:text-blue-600">About</a></li>
            <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
            <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
            <li><a href="#cta" className="hover:text-blue-600">Sign Up</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main id="home" className="flex-1">
        <section
          className="text-center text-white bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1518306723728-6349e8fa19da?auto=format&fit=crop&w=1200&q=80')] px-4 py-24"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Revolutionize Vehicle Intelligence with AI</h1>
          <p className="mb-6 text-lg">Unlock advanced insights and automation for your vehicle data.</p>
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded">
            Try Free
          </Link>
        </section>

        {/* Our Services */}
        <section id="services" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl" role="img" aria-label="VIN Decoder">🔍</span>
              <h3 className="font-semibold mt-4">VIN Decoding</h3>
              <p>Instantly decode vehicle identification numbers.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl" role="img" aria-label="Catalog">📚</span>
              <h3 className="font-semibold mt-4">Vehicle Catalog</h3>
              <p>Access comprehensive vehicle data and specs.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl" role="img" aria-label="Accident Estimator">🛠️</span>
              <h3 className="font-semibold mt-4">AI Accident Estimator</h3>
              <p>Quickly estimate damage costs using AI.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl" role="img" aria-label="Reconditioning">🎨</span>
              <h3 className="font-semibold mt-4">AI Vehicle Reconditioning</h3>
              <p>Enhance vehicle images with smart reconditioning.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl" role="img" aria-label="Valuation">💰</span>
              <h3 className="font-semibold mt-4">Vehicle Valuation</h3>
              <p>Receive accurate market valuations in seconds.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="about" className="bg-gray-100 dark:bg-gray-800 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl" role="img" aria-label="Fast">⚡</span>
                <h3 className="font-semibold mt-4">Fast & Accurate</h3>
                <p>Get results powered by real-time AI processing.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl" role="img" aria-label="AI">🤖</span>
                <h3 className="font-semibold mt-4">AI-Powered</h3>
                <p>Advanced algorithms deliver smart insights.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl" role="img" aria-label="All-in-One">🧰</span>
                <h3 className="font-semibold mt-4">Multiple Services</h3>
                <p>Everything you need in one platform.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl" role="img" aria-label="Secure">🔒</span>
                <h3 className="font-semibold mt-4">Secure</h3>
                <p>Your data is protected with industry standards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-around">
            <div className="flex flex-col items-center mb-8 md:mb-0">
              <span className="text-4xl" role="img" aria-label="Upload">📤</span>
              <p className="mt-2">Upload</p>
            </div>
            <span className="text-4xl hidden md:block" aria-hidden="true">➡️</span>
            <div className="flex flex-col items-center mb-8 md:mb-0">
              <span className="text-4xl" role="img" aria-label="Analyze">🧠</span>
              <p className="mt-2">Analyze</p>
            </div>
            <span className="text-4xl hidden md:block" aria-hidden="true">➡️</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl" role="img" aria-label="Result">✅</span>
              <p className="mt-2">Result</p>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section id="pricing" className="bg-gray-100 dark:bg-gray-800 py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Pricing Preview</h2>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded shadow text-center">
            <p className="text-xl font-semibold mb-2">Starter Plan</p>
            <p className="text-2xl font-bold mb-4">$19/mo</p>
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full mb-4">Free Trial Available</span>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded">
              Start Now
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="bg-white p-6 rounded shadow">
              <p>"Amazing service that saved us hours of work!"</p>
              <footer className="mt-4">— Alex</footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded shadow">
              <p>"The AI estimates are incredibly accurate."</p>
              <footer className="mt-4">— Jamie</footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded shadow">
              <p>"A must-have tool for any dealership."</p>
              <footer className="mt-4">— Sam</footer>
            </blockquote>
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="bg-blue-600 dark:bg-blue-700 text-white text-center py-16 px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your workflow?</h2>
          <Link to="/signup" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded">
            Sign Up
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 dark:bg-gray-900 text-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">AIVhicles</h3>
            <p className="text-sm">© 2024 AIVhicles</p>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
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
              <input id="newsletter" type="email" placeholder="Email" className="p-2 w-full text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-l" />
              <button className="bg-blue-500 dark:bg-blue-600 px-4 rounded-r" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}


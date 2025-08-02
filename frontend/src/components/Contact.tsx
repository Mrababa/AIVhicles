import React, { useState } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import HeroSection from './HeroSection.tsx';

/**
 * Contact page with a basic feedback form.
 */
export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Header />
      <HeroSection short />
      <main className="max-w-3xl mx-auto px-4 py-16 text-slate-700 dark:text-slate-300">
        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100">Contact Us</h1>
        <p className="mb-8">Have questions or feedback? Send us a message and we will get back to you.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full border border-slate-300 p-2 rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="w-full border border-slate-300 p-2 h-32 rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

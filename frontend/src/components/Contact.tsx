import React, { useState } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import HeroSection from './HeroSection.tsx';

/**
 * Contact page with split layout form and contact details.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />
      <HeroSection short showContent={false} />
      <main className="max-w-6xl mx-auto px-4 py-24 text-slate-700 dark:text-slate-300">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 p-6 rounded-md">
                  <h2 className="text-2xl font-semibold mb-2">Message Sent!</h2>
                  <p>Thanks for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Get in Touch</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      Have questions or need help? Send us a message.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Our Office</p>
                    <p className="text-sm">1234 Data Drive<br />San Francisco, CA 94107</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Email Us</p>
                    <a
                      href="mailto:support@vehiclesdata.com"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      support@vehiclesdata.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <PhoneIcon className="w-6 h-6 text-indigo-500" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">Call Us</p>
                    <p className="text-sm">1-800-555-1234</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <iframe
                  title="Our location"
                  className="w-full h-48 md:h-64 rounded-lg border-0"
                  src="https://maps.google.com/maps?q=San%20Francisco%20CA&z=13&output=embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


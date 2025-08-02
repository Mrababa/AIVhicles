import React from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is VehiclesData?',
    answer:
      'VehiclesData is a platform that aggregates vehicle information and provides tools for analysis and integration.'
  },
  {
    question: 'Can I contribute data or features?',
    answer:
      'Yes. VehiclesData is an open project and we welcome community contributions to improve our datasets and tooling.'
  },
  {
    question: 'Is there an API available?',
    answer:
      'Developers can integrate with our REST API to retrieve vehicle data. Documentation is available on the API page.'
  }
];

/**
 * Frequently asked questions about VehiclesData.
 */
export default function FAQ() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">FAQ</h1>
        <dl className="space-y-6 text-slate-700 dark:text-slate-300">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold">{f.question}</dt>
              <dd className="mt-2">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </main>
      <Footer />
    </>
  );
}

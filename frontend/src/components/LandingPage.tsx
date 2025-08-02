import React from 'react';
import Header from './Header.tsx';
import HeroSection from './HeroSection.tsx';
import FeaturesSection from './FeaturesSection.tsx';
import TestimonialsSection from './TestimonialsSection.tsx';
import FinalCTASection from './FinalCTASection.tsx';
import Footer from './Footer.tsx';
import { ContentProvider } from '../contexts/ContentContext.tsx';

/**
 * Main marketing landing page composed of multiple full width sections.
 */
export default function LandingPage() {
  return (
    <ContentProvider>
      <Header />
      <main className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </ContentProvider>
  );
}


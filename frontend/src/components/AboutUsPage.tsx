import React from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import TeamMemberCard from './TeamMemberCard.tsx';
import HeroSection from './HeroSection.tsx';

/**
 * Public about page introducing the VehiclesData team and mission.
 */
export default function AboutUsPage() {
  const leadership = [
    {
      name: 'Alex Carter',
      title: 'Founder & CEO',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Jamie Smith',
      title: 'CTO',
      image: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'Taylor Lee',
      title: 'Head of Design',
      image: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Header />
      <HeroSection short showContent={false} />
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 md:p-12">
          {/* Introductory Section */}
          <section className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold">About VehiclesData</h1>
            <p className="mt-4">
              VehiclesData empowers developers and enthusiasts with modern tools and
              insights to understand vehicle information more effectively.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4">
              Our mission is to make comprehensive vehicle data accessible and
              actionable for everyone. We strive to build a community-driven platform
              that leverages AI to transform how people interact with vehicle
              information.
            </p>
          </section>

          {/* Leadership Section */}
          <section className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-700 text-center">
            <h2 className="text-2xl font-bold">Our Leadership</h2>
            <p className="mt-4">
              Meet the dedicated team steering the vision of VehiclesData.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {leadership.map((member) => (
                <TeamMemberCard key={member.name} {...member} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}


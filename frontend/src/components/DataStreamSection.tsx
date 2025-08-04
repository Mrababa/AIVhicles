import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { ContentContext } from '../contexts/ContentContext.tsx';

/**
 * Visually represents the continuous flow of data packets.
 */
export default function DataStreamSection() {
  const { dataStreamHeadline, dataStreamDescription } =
    useContext(ContentContext);
  const [packetCount, setPacketCount] = useState(30);

  // Reduce number of packets on smaller screens for performance
  useEffect(() => {
    const updateCount = () =>
      setPacketCount(window.innerWidth < 768 ? 15 : 30);
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  // Precompute packet animation settings so they remain stable
  const packets = useMemo(
    () =>
      Array.from({ length: packetCount }, () => ({
        top: Math.random() * 100,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 5,
      })),
    [packetCount],
  );

  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(100,116,139,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent,#1e293b)]" />

      {packets.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute h-1 w-24 bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.7)]"
          style={{ top: `${p.top}%` }}
          initial={{ x: '-100%' }}
          animate={{ x: '100vw' }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="relative flex min-h-[20rem] items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-200">
            {dataStreamHeadline}
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            {dataStreamDescription}
          </p>
        </div>
      </div>
    </section>
  );
}


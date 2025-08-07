import React, { useState, useEffect } from 'react';
import SimpleHeader from './SimpleHeader.tsx';
import Footer from './Footer.tsx';
import Spinner from './Spinner.jsx';
import { motion } from 'framer-motion';
import {
  GlobeAltIcon,
  TruckIcon,
  FireIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
} from './Icons.tsx';
import { decodeVin, VinDecodeResult } from '../services/vinDecoder.ts';

const SAMPLE_VIN = '1HGCM82633A004352';

/** VIN Decoder marketing page */
export default function VinDecoderPage() {
  const [vin, setVin] = useState('');
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [data, setData] = useState<VinDecodeResult | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    setLogoFailed(false);
  }, [data?.make]);

  const ready = vin.length === 17 && status !== 'loading';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 17);
    setVin(value);
    if (status === 'error') {
      setStatus('initial');
    }
  };

  const handleDecode = async () => {
    setStatus('loading');
    try {
      const result = await decodeVin(vin);
      setData(result);
      setVin('');
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <SimpleHeader />
      <main className="flex-grow container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-8">VIN Decoder</h1>
        <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="flex-1 w-full">
            <label htmlFor="vin-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Vehicle Identification Number
            </label>
            <input
              id="vin-input"
              type="text"
              value={vin}
              onChange={handleChange}
              maxLength={17}
              disabled={status === 'loading'}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm dark:bg-slate-700 font-mono text-lg focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="17-character VIN"
            />
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Sample VIN:{' '}
              <button
                type="button"
                onClick={() => setVin(SAMPLE_VIN)}
                className="font-mono text-indigo-600 hover:underline"
              >
                {SAMPLE_VIN}
              </button>
            </p>
          </div>
          <button
            type="button"
            onClick={handleDecode}
            disabled={!ready}
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Decode &amp; Value
          </button>
        </div>

        <div aria-live="polite" className="mt-8">
          {status === 'initial' && (
            <p className="text-center text-slate-600 dark:text-slate-300">Ready to Decode</p>
          )}

          {status === 'loading' && (
            <div className="text-center">
              <Spinner />
              <p className="mt-2">Fetching vehicle data...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
              <p>VIN could not be decoded. Please check the number or try another.</p>
            </div>
          )}

          {status === 'success' && data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {data.imageUrl && (
                  <img
                    src={data.imageUrl}
                    alt={`Photo of ${data.year} ${data.make} ${data.model}`}
                    className="w-full md:w-1/3 h-64 object-cover"
                  />
                )}
                <div className="p-6 flex-1">
                  {!logoFailed && data.make && (
                    <img
                      src={`https://logo.clearbit.com/${data.make.toLowerCase()}.com`}
                      alt={`${data.make} logo`}
                      className="w-16 h-16 mb-4 object-contain"
                      onError={() => setLogoFailed(true)}
                    />
                  )}
                  {logoFailed && data.make && (
                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-700">
                      <span className="text-lg font-bold">{data.make}</span>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold mb-2">
                    {data.year} {data.make} {data.model}
                  </h2>
                  <p className="text-4xl font-extrabold text-indigo-600 mb-4">
                    ${data.valuation}
                  </p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-2">
                      <GlobeAltIcon className="w-5 h-5 text-indigo-600" />
                      <div>
                        <dt className="font-medium">Country of Manufacture</dt>
                        <dd>{data.country}</dd>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <TruckIcon className="w-5 h-5 text-indigo-600" />
                      <div>
                        <dt className="font-medium">Body Type</dt>
                        <dd>{data.bodyType}</dd>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FireIcon className="w-5 h-5 text-indigo-600" />
                      <div>
                        <dt className="font-medium">Fuel Type</dt>
                        <dd>{data.fuelType}</dd>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Cog6ToothIcon className="w-5 h-5 text-indigo-600" />
                      <div>
                        <dt className="font-medium">Engine</dt>
                        <dd>{data.engine}</dd>
                      </div>
                    </div>
                  </dl>
                  {data.summary && (
                    <p className="mt-4 text-slate-600 dark:text-slate-300">{data.summary}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

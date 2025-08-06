import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import ImageUploader from './ImageUploader.jsx';
import VehicleDetailsDisplay from './VehicleDetailsDisplay.jsx';
import DamageReportDisplay from './DamageReportDisplay.jsx';
import Spinner from './Spinner.jsx';
import { inspectVehicleFromImage } from '../services/geminiService.ts';

/**
 * Page allowing authenticated users to upload an image and get an AI inspection report.
 */
export default function AIVehicleInspector() {
  const { isAuthenticated } = useAuth();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async () => {
    if (!image) {
      setError('Please upload an image of the vehicle.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await inspectVehicleFromImage(image);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not get an estimate.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">AI Vehicle Inspector</h1>

      {!result && !loading && (
        <>
          <ImageUploader onImageSelected={setImage} />
          {error && <p className="text-red-600">{error}</p>}
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            onClick={handleSubmit}
            disabled={!image}
          >
            Get AI Inspection
          </button>
        </>
      )}

      {loading && (
        <>
          <Spinner />
          <p className="text-center text-gray-600">AI is inspecting the vehicle...</p>
        </>
      )}

      {result && !loading && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <VehicleDetailsDisplay vehicle={result.vehicle} />
            <DamageReportDisplay damage={result.damage} />
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Inspect Another Vehicle
          </button>
        </div>
      )}
    </div>
  );
}


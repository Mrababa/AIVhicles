import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Page allowing users to upload images and receive a damage estimate.
 */
export default function CarDamageEstimator() {
  const { isAuthenticated } = useAuth();
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const valid = [];
    const urls = [];
    for (const file of files) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only JPG and PNG files are allowed.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Each file must be less than 10MB.');
        return;
      }
      valid.push(file);
      urls.push(URL.createObjectURL(file));
    }
    setError('');
    setImages(valid);
    setPreviews(urls);
  };

  const analyze = async () => {
    if (images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      images.forEach((img) => formData.append('images', img));
      const res = await axios.post('/api/damage-estimator/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setReport(res.data);
    } catch (err) {
      setError(err.response?.data || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImages([]);
    setPreviews([]);
    setReport(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Car Images</h1>
      <input
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        onChange={handleFiles}
        className="block w-full text-sm"
      />
      <div className="flex mt-4 space-x-2">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-24 h-24 object-cover rounded"
          />
        ))}
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button
        onClick={analyze}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Damage'}
      </button>

      {report && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Your Car Damage Report</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Vehicle Details</h3>
            <p>
              {report.make} {report.model} {report.year}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Damage Summary</h3>
            <ul className="list-disc ml-5">
              {report.damages.map((d, i) => (
                <li key={i}>
                  {d.part} - {(d.confidence * 100).toFixed(0)}% confidence - ${d.cost.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Repair Estimate</h3>
            <p>Parts: ${report.partsCost.toFixed(2)}</p>
            <p>Labor: ${report.laborCost.toFixed(2)}</p>
            <p className="font-bold">Total: ${report.totalCost.toFixed(2)}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={reset} className="px-4 py-2 bg-gray-200 rounded">
              Re-upload Images
            </button>
            <button
              onClick={() => alert('Quote request submitted')}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Request Full Repair Quote
            </button>
            <button
              onClick={() => alert('Download not implemented')}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Download Report (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

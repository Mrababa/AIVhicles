import React from 'react';

/**
 * Shows damage assessment including cost breakdown.
 */
export default function DamageReportDisplay({ damage }) {
  if (!damage) {
    return (
      <div className="p-4 border rounded flex items-center space-x-2">
        <span className="text-green-600 text-2xl">✓</span>
        <p className="text-green-700 font-medium">No Damage Detected</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-2">Damage Assessment</h3>
      <p className="text-xl font-bold mb-2">
        {damage.totalMinAED} - {damage.totalMaxAED} AED
      </p>
      <p className="mb-4">{damage.summary}</p>
      <table className="w-full text-left mb-4">
        <thead>
          <tr>
            <th className="border-b p-2">Part</th>
            <th className="border-b p-2">Cost (AED)</th>
          </tr>
        </thead>
        <tbody>
          {damage.items.map((item, idx) => (
            <tr key={idx}>
              <td className="border-b p-2">{item.part}</td>
              <td className="border-b p-2">{item.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2">
        <p>Parts Subtotal: {damage.partsTotalAED} AED</p>
        <p>Estimated Labor: {damage.laborAED} AED</p>
      </div>
    </div>
  );
}


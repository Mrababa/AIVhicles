import React from 'react';

export default function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        active
          ? 'bg-green-100 text-green-800'
          : 'bg-slate-200 text-slate-800'
      }`}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

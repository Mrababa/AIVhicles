import React from 'react';

interface UsageBarProps {
  current: number;
  limit: number;
}

export default function UsageBar({ current, limit }: UsageBarProps) {
  const percent = Math.min(100, Math.round((current / limit) * 100));
  return (
    <div className="flex items-center">
      <div
        className="h-2 w-32 rounded bg-slate-200 dark:bg-slate-700"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={limit}
      >
        <div
          className="h-2 rounded bg-indigo-600"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="ml-2 w-28 text-right text-sm text-slate-700 dark:text-slate-300">
        {current.toLocaleString()} / {limit.toLocaleString()}
      </span>
    </div>
  );
}

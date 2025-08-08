import React from 'react';

type StatusBadgeProps =
  | { status: string; active?: never }
  | { active: boolean; status?: never };

const STYLES: Record<string, string> = {
  Active: 'bg-green-100 text-green-800',
  Trial: 'bg-sky-100 text-sky-800',
  Suspended: 'bg-amber-100 text-amber-800',
  Inactive: 'bg-slate-200 text-slate-800',
};

export default function StatusBadge(props: StatusBadgeProps) {
  const label = 'status' in props ? props.status : props.active ? 'Active' : 'Inactive';
  const className = STYLES[label] || STYLES.Inactive;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}

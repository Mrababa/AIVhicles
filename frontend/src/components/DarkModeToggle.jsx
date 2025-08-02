import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className="px-3 py-2 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
    >
      {enabled ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

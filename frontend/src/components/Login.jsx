import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from './LogoIcon.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Admin login form with hardcoded credential check.
 */
export default function Login() {
  // Local form state for the user's credentials. In a real implementation
  // these values would be sent to a backend authentication endpoint.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  // Basic credential check which should eventually be replaced with a call
  // to a secure login API that returns a token or session cookie.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'admin') {
      auth.login();
      // After successful authentication redirect to the admin portal.
      navigate('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
        <LogoIcon className="w-12 h-12 text-indigo-600 mx-auto" />
        <h2 className="mt-4 text-center text-2xl font-bold text-slate-900 dark:text-slate-100">Admin Login</h2>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="email"
              required
              placeholder="Email (admin@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 focus:outline-none focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="password"
              required
              placeholder="Password (admin)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 focus:outline-none focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up for a free trial
          </Link>
        </p>
      </div>
    </div>
  );
}


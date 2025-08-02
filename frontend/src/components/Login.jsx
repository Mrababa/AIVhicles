import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Simple login form that requests a JWT token from the backend.
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/auth/login', null, {
      params: { username, password }
    });
    localStorage.setItem('token', response.data);
    navigate('/vehicles');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 shadow-md rounded space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Login</h1>
        <input
          className="border border-slate-300 p-2 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-slate-300 p-2 w-full dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white px-4 py-2 rounded" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

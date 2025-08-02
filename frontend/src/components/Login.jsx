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
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 shadow-md rounded space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Login</h1>
        <input
          className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

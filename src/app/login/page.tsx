'use client';

import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/login', { username, password });

      if (response.status === 200) {
        const { role } = response.data;

        switch (role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'sales':
            router.push('/sales');
            break;
          case 'developer':
            router.push('/developer');
            break;
          case 'finance':
            router.push('/finance');
            break;
          case 'investor':
            router.push('/investor');
            break;
          case 'client':
            router.push('/client');
            break;
            
          default:
            router.push('/');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">Login</h1>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-green-800 mb-1">Username</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaUser className="text-green-600 mr-2" />
            <input
              type="text"
              className="w-full outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-green-800 mb-1">Password</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaLock className="text-green-600 mr-2" />
            <input
              type="password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

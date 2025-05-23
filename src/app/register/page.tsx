'use client';

import { useState } from 'react';
import { FaUser, FaLock, FaUserTag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('sales');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/register', { username, password, role });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">Register</h1>

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

        {/* Role */}
        <div className="mb-4">
          <label className="block text-green-800 mb-1">Role</label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaUserTag className="text-green-600 mr-2" />
            <select
              className="w-full outline-none bg-transparent"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
              <option value="developer">Developer</option>
              <option value="investor">Investor</option>
              <option value="client">Client</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}

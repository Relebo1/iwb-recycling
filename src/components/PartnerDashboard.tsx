// components/PartnerDashboard.tsx
import React from 'react';

export default function PartnerDashboard({ username }: { username: string }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-purple-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Partner Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">Sales Overview</li>
            <li className="mb-3">Income Statement</li>
            <li className="mb-3">Application Files</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-purple-50">
        <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
        <p className="text-purple-700 mt-2">You have read-only access to most modules.</p>
      </main>
    </div>
  );
}
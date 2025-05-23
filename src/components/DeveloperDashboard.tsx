// components/DeveloperDashboard.tsx
import React from 'react';

export default function DeveloperDashboard({ username }: { username: string }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Developer Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">Project Files</li>
            <li className="mb-3">Deployment Logs</li>
            <li className="mb-3">Version Control</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
        <p className="text-gray-700 mt-2">Access application files and logs.</p>
      </main>
    </div>
  );
}
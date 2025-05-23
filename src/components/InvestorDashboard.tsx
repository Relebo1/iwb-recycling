import React from 'react';

export default function InvestorDashboard({ username }: { username: string }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-yellow-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Investor Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">Income Reports</li>
            <li className="mb-3">Financial Charts</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-yellow-50">
        <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
        <p className="text-yellow-700 mt-2">Review income data for IWB.</p>
      </main>
    </div>
  );
}
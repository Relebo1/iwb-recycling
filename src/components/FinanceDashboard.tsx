import React from 'react';

type FinanceDashboardProps = {
  username: string;
};

export default function FinanceDashboard({ username }: FinanceDashboardProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Finance Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3 hover:text-blue-300 cursor-pointer">Invoices</li>
            <li className="mb-3 hover:text-blue-300 cursor-pointer">Budgets</li>
            <li className="mb-3 hover:text-blue-300 cursor-pointer">Reports</li>
            <li className="mb-3 hover:text-blue-300 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-blue-50">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-blue-900">Welcome, {username}</h1>
          <p className="text-blue-700 mt-1">Financial summary and tasks.</p>
        </header>

        <section>
          <p>Manage your invoices, budgets, and financial reports here.</p>
        </section>
      </main>
    </div>
  );
}

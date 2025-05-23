'use client';
import React, { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

type User = {
  id: number;
  username: string;
  password: string; // ✅ fixed typo
  role: string;
};

export default function AdminDashboard({ username }: { username: string }) {
  // State for users
  const [users, setUsers] = useState<User[]>([]);
  const [userForm, setUserForm] = useState({ username: '', password: '', role: 'user' });

  // State for products
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch(() => setLoadingProducts(false));
  }, []);

  // Fetch users on mount
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  // ✅ Fixed to support both <input> and <select>
  const handleUserInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // Submit new user to API
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || 'Failed to add user');
        return;
      }

      const newUser = await res.json();
      setUsers([...users, newUser]);
      setUserForm({ username: '', password: '', role: 'user' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-red-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">Manage Users</li>
            <li className="mb-3">Audit Logs</li>
            <li className="mb-3">System Overview</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-red-50">
        <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
        <p className="text-red-700 mt-2 mb-6">You have full access to the system.</p>

        {/* Add User Form */}
        <section className="mb-10 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Add New User</h2>

          <form onSubmit={handleAddUser} className="grid grid-cols-2 gap-4 max-w-md">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userForm.username}
              onChange={handleUserInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userForm.password}
              onChange={handleUserInputChange}
              required
            />
            <select
              name="role"
              value={userForm.role}
              onChange={handleUserInputChange}
              className="border p-2 rounded"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="sales">Sales</option>
              <option value="developer">Developer</option>
              <option value="finance">Finance</option>
              <option value="investor">Investor</option>
            </select>
            <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded">
              Add User
            </button>
          </form>
        </section>

        {/* Products List */}
        <section className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Available Products</h2>
          {loadingProducts ? (
            <p>Loading products...</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-red-100 text-left">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Price (M)</th>
                  <th className="border p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-red-50">
                    <td className="border p-2">{product.id}</td>
                    <td className="border p-2">{product.name}</td>
                    <td className="border p-2">{product.category}</td>
                    <td className="border p-2">M{product.price}</td>
                    <td className="border p-2">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

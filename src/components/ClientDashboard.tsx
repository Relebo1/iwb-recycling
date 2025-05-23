import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export default function ClientDashboard({ username }: { username: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [query, setQuery] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    fetch('/api/product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  const handleBuy = async () => {
    if (!selectedProductId || quantity < 1) return;
    await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: selectedProductId, quantity }),
    });
    alert('Purchase recorded');
  };

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    });
    alert('Query submitted');
    setQuery({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-blue-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Client Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">View Products</li>
            <li className="mb-3">Buy Products</li>
            <li className="mb-3">Send Query</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-blue-50">
        <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
        <p className="text-blue-700 mt-2 mb-6">Browse products, make purchases, and send us queries.</p>

        {/* Product Table */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Available Products</h2>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price (M)</th>
                <th className="border p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => setSelectedProductId(product.id)}>
                  <td className="border p-2">{product.id}</td>
                  <td className="border p-2">{product.name}</td>
                  <td className="border p-2">{product.category}</td>
                  <td className="border p-2">M{product.price}</td>
                  <td className="border p-2">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
              className="border p-2 rounded"
            />
            <button onClick={handleBuy} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Buy Selected Product
            </button>
          </div>
        </div>

        {/* Query Form */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Send Query</h2>
          <form onSubmit={handleQuerySubmit} className="grid grid-cols-1 gap-4 max-w-lg">
            <input
              type="text"
              placeholder="Your Name"
              value={query.name}
              onChange={e => setQuery({ ...query, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={query.email}
              onChange={e => setQuery({ ...query, email: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder="Your Message"
              value={query.message}
              onChange={e => setQuery({ ...query, message: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
              Send Query
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

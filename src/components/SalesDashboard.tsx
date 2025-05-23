'use client';
import React, { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
};

type FormData = {
  name: string;
  category: string;
  price: string;
  stock: string;
};

type Query = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};


export default function SalesDashboard({ username }: { username: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [queries, setQueries] = useState<Query[]>([]);

  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
  const fetchProducts = fetch('/api/product').then(res => res.json());
  const fetchQueries = fetch('/api/queries').then(res => res.json());

  Promise.all([fetchProducts, fetchQueries])
    .then(([productsData, queriesData]) => {
      setProducts(productsData);
      setQueries(queriesData);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
}, []);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        const data = await res.json();
        setProducts(data.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error('Error fetching products:', err);
        setFeedback('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, category, price, stock } = formData;

    if (!name || !category || isNaN(Number(price)) || isNaN(Number(stock))) {
      setFeedback('Please enter valid data.');
      return;
    }

    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          price: parseFloat(price),
          stock: parseInt(stock),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setProducts((prev) => [...prev, result]);
        setFormData({ name: '', category: '', price: '', stock: '' });
        setFeedback('Product registered successfully!');
      } else {
        setFeedback(result.error || 'Failed to add product.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setFeedback('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-green-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Sales Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-3">Sales Records</li>
            <li className="mb-3">Client Queries</li>
            <li className="mb-3">Register Product</li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-green-50">
        <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
        <p className="text-green-700 mt-2 mb-6">Track sales, respond to queries, and manage products.</p>

        {/* Product Registration Form */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Register New Product</h2>

          {feedback && (
            <p className={`mb-4 p-2 rounded ${feedback.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {feedback}
            </p>
          )}

          <form onSubmit={handleProductSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (M)"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-2 rounded"
              min="0"
              step="0.01"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="border p-2 rounded"
              min="0"
              required
            />
            <button type="submit" className="col-span-2 bg-green-700 text-white py-2 rounded hover:bg-green-800">
              Register Product
            </button>
          </form>
        </div>

        {/* Product Table */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Available Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100 text-left">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Price (M)</th>
                  <th className="border p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-green-50">
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

          {/* Client Queries Table */}
<div className="bg-white p-6 rounded shadow mt-10">
  <h2 className="text-xl font-semibold mb-4">Client Queries</h2>
  {loading ? (
    <p>Loading queries...</p>
  ) : queries.length === 0 ? (
    <p>No queries found.</p>
  ) : (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-green-100 text-left">
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Message</th>
          <th className="border p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {queries.map((query) => (
          <tr key={query.id} className="hover:bg-green-50">
            <td className="border p-2">{query.id}</td>
            <td className="border p-2">{query.name}</td>
            <td className="border p-2">{query.email}</td>
            <td className="border p-2">{query.message}</td>
            <td className="border p-2">{new Date(query.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

        </div>
      </main>
    </div>
  );
}

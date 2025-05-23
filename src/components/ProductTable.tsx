import React from "react";

const ProductTable = () => {
  const products = [
    { id: 1, name: "Product A", price: 99.99, stock: 10 },
    { id: 2, name: "Product B", price: 149.99, stock: 5 },
    { id: 3, name: "Product C", price: 79.99, stock: 20 },
  ];

  return (
    <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Price</th><th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td><td>{p.name}</td><td>${p.price.toFixed(2)}</td><td>{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

import React, { useState } from "react";

const QueryForm = ({ onAddQuery }: { onAddQuery: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAddQuery(query.trim());
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "70%" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
        Submit
      </button>
    </form>
  );
};

export default QueryForm;

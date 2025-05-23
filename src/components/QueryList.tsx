import React from "react";

const QueryList = ({ queries }: { queries: string[] }) => {
  if (queries.length === 0) return <p>No queries submitted yet.</p>;

  return (
    <ul>
      {queries.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>
  );
};

export default QueryList;

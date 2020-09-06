import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1 style={{ paddingLeft: 40, display: "flex", flexDirection: "column" }}>
        {" "}
        {count * 10}{" "}
      </h1>
      <button
        onClick={() => setCount(count + 1)}
        fontSize="large"
        style={{ padding: 5, margin: 15 }}
      >
        +
      </button>
      <button
        onClick={() => setCount(count - 1)}
        fontSize="large"
        style={{ padding: 5, margin: 15 }}
      >
        -
      </button>
    </div>
  );
}

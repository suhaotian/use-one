import { useState } from "react";
import { usePersist } from "use-one";
import React = require("react");

export function PersistCounter() {
  const [count, setCount] = useState(0);
  const [isReady, cleanCache] = usePersist<typeof count>({
    key: '@count-store-key',
    getState: () => count,
    setState: setCount,
    // setState: (state) => setCount(state),
  });
  if (!isReady) return <div>Loading</div>;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={cleanCache}>Clean cache</button>
      <br />
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}
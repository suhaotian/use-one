'use client';

import { countStore, useCount } from './useCount';

export function Counter() {
  const [{ count }] = useCount();
  return (
    <div>
      <h1 test-id="client-count">{count}</h1>
      <p suppressHydrationWarning>{JSON.stringify(countStore.getState())}</p>
      <button onClick={countStore.increment}>+1</button>
      <button onClick={countStore.decrement}>-1</button>
    </div>
  );
}

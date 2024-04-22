'use client';

import { countStore } from "./useCount";

export function Counter() {
  const [state,] = countStore.use();
  return (
    <div>
      <h1 test-id="client-count">{state.count}</h1>
      <p suppressHydrationWarning>{JSON.stringify(countStore.getState())}</p>
      <button onClick={countStore.increment}>+1</button>
      <button onClick={countStore.decrement}>-1</button>
    </div>
  )
}
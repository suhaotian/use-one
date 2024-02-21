'use client';
import { actions, useCount } from "./useCount";

export function Counter() {
  const [state, setState] = useCount();

  return (
    <div>
      <h1 test-id="client-count">{state.count}</h1>
      <button onClick={actions.increment}>+1</button>
      <button onClick={actions.decrement}>-1</button>
    </div>
  )
}
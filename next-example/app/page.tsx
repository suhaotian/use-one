'use client';

import { countStore, useCount } from "./useCount";
import { Counter } from './Counter'
import { usePersist } from 'use-one';
import { useState } from "react";

export default function Home() {
  const [{ count },] = useCount();

  const [state, setState] = useState({ a: 1, b: 2, c: [1] });
  const [isReady, clean] = usePersist<typeof state>({ key: '@__test-persist', getState: () => state, setState: (state) => setState(state) });

  return (
    <>
      <div className="text-xl" test-id="server-count">{count}</div>
      <Counter></Counter>

      <button onClick={() => {
        setState({
          a: 4, b: 6, c: [7, 9]
        })
      }}>Update</button>
      {' '}
      <button onClick={clean}>remove store</button>
      <pre>{JSON.stringify(state)} {isReady ? 'true' : 'false'}</pre>

      <Counter2 />
    </>
  );
}


function Counter2() {
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
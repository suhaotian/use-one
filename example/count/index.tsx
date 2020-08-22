// example
import * as React from 'react';
import { useCount, countStore, actions, selectors } from './useCount';

const items = Array.from({ length: 10 * 100 });

export const App = () => {
  React.useEffect(() => {
    const unsubscribe = countStore.subscribe(newState => {
      console.log('update new state:', newState);
      console.log('select count:', selectors.selectCount());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      <Counter />
      <ul>
        {items.map((j, i) => {
          return (
            <li key={i}>
              <ShowCount />
              {j}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

const Counter = () => {
  return (
    <div>
      <button onClick={actions['+1']}>+1</button>
      <ShowCount />
      <button onClick={actions['-1']}>-1</button>
    </div>
  );
};

const ShowCount = () => {
  const [countState] = useCount();

  return <span>{countState.count}</span>;
};

// example
import * as React from 'react';
import {
  useCount,
  countStore,
  countActions,
  countSelectors,
} from './states/count';

const items = Array.from({ length: 10 * 100 });

export const CounterExample = () => {
  React.useEffect(() => {
    const unsubscribe = countStore.subscribe(newState => {
      console.log('update new state:', newState);
      console.log('select count:', countSelectors.getState());
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
      <button onClick={countActions['+1']}>+1</button>
      <ShowCount />
      <button onClick={countActions['-1']}>-1</button>
    </div>
  );
};

const ShowCount = () => {
  useCount();

  return <span>{countSelectors.getCount()}</span>;
};

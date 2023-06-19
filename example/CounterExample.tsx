// example
import * as React from 'react';
import {
  useCount,
  // countStore,
  countActions,
  countSelectors,
} from './states/useCount';
import { Fragment } from 'react';

const items = Array.from({ length: 10 * 100 });

export const CounterExample = () => {
  // useEffect(() => {
  //   const unsubscribe = countStore.subscribe(newState => {
  //     console.log('update new state:', newState);
  //     console.log('select count:', countSelectors.state);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <Fragment>
      <Counter />
      <ul>
        {items.map((j, i) => {
          return (
            <li key={i}>
              <>
                <ShowCount />
                {j}
              </>
            </li>
          );
        })}
      </ul>
    </Fragment>
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

  return <span>{countSelectors.count}</span>;
};

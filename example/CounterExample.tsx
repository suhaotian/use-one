// example
import * as React from 'react';
import {
  countStore
} from './states/count';
import { Fragment } from 'react';

const items = Array.from({ length: 10 * 100 });

export const CounterExample = () => {
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
      <button onClick={countStore['+1']}>+1</button>
      <ShowCount />
      <button onClick={countStore['-1']}>-1</button>
    </div>
  );
};

const ShowCount = () => {
  countStore.use();

  return <span>{countStore.count}</span>;
};

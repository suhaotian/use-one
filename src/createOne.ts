import { useState, useEffect } from 'react';
import eventemitter3 from 'eventemitter3';

let ID = 0;
function getID() {
  ID++;
  return `${ID}`;
}

export const eventBus = new eventemitter3();

/** @todo Why so many Readonly? */
export function createOne<T>(
  initialState: Readonly<T>
): [
  () => [Readonly<T>, (newValue: Readonly<T>) => void],
  {
    getState: () => Readonly<T>;
    setState: (newValue: Readonly<T>) => void;
    subscribe: (cb: (state: Readonly<T>) => void) => () => void;
  }
] {
  const EVENT_NAME = getID();

  let _state = initialState;

  const setState = (newValue: Readonly<T>) => {
    _state = newValue;
    eventBus.emit(EVENT_NAME, _state);
  };

  function useOne(): [Readonly<T>, (newValue: Readonly<T>) => void] {
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
      function updater() {
        setUpdateCount(updateCount + 1);
      }
      // create and destroy at every render? currently yes...
      eventBus.on(EVENT_NAME, updater);
      return () => {
        eventBus.off(EVENT_NAME, updater);
      };
    }, [updateCount]);

    return [_state, setState];
  }

  const store = {
    getState: () => _state,
    setState,
    subscribe: (cb: (state: Readonly<T>) => void) => {
      eventBus.on(EVENT_NAME, cb);
      return () => {
        eventBus.off(EVENT_NAME, cb);
      };
    },
  };
  return [useOne, store];
}

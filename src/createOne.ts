import { useState, useEffect } from 'react';
import eventemitter3 from 'eventemitter3';
import { ReadonlyNonBasicType } from './types';

let ID = 0;
function getID() {
  ID++;
  return `${ID}`;
}

export let eventBus: eventemitter3;

export function createOne<T>(
  initialState: ReadonlyNonBasicType<T>
): [
  /** Why so many ReadonlyNonBasicType here... */
  () => [ReadonlyNonBasicType<T>, (newValue: ReadonlyNonBasicType<T>) => void],
  {
    getState: () => ReadonlyNonBasicType<T>;
    setState: (newValue: ReadonlyNonBasicType<T>) => void;
    subscribe: (cb: (state: ReadonlyNonBasicType<T>) => void) => () => void;
  }
] {
  if (eventBus === undefined) {
    eventBus = new eventemitter3();
  }

  const EVENT_NAME = getID();

  let updateCountRef = 0;
  let _state = initialState;

  const setState = (newValue: ReadonlyNonBasicType<T>) => {
    _state = newValue;
    eventBus?.emit(EVENT_NAME, _state);
  };

  function useOne(): [
    ReadonlyNonBasicType<T>,
    (newValue: ReadonlyNonBasicType<T>) => void
  ] {
    const [, setUpdateCount] = useState(0);

    useEffect(() => {
      function updater() {
        setUpdateCount(++updateCountRef);
      }
      eventBus.on(EVENT_NAME, updater);

      return () => {
        eventBus.off(EVENT_NAME, updater);
        updateCountRef = 0;
      };
    }, []);

    return [_state, setState];
  }

  const store = {
    getState: () => _state,
    setState,
    subscribe: (cb: (state: ReadonlyNonBasicType<T>) => void) => {
      eventBus.on(EVENT_NAME, cb);
      return () => {
        eventBus.off(EVENT_NAME, cb);
      };
    },
  };
  return [useOne, store];
}

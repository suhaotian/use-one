import { useState, useEffect, useRef } from 'react';
import eventemitter3 from 'eventemitter3';

let ID = 0;
function getID() {
  ID++;
  return `${ID}`;
}

export let eventBus: eventemitter3;

export function createOne<T>(
  initialState: Readonly<T>
): [
  /** Why so many Readonly here... */
  () => [Readonly<T>, (newValue: Readonly<T>) => void],
  {
    getState: () => Readonly<T>;
    setState: (newValue: Readonly<T>) => void;
    subscribe: (
      cb: (state: Readonly<T>) => void
    ) => () => void;
  }
] {
  if (eventBus === undefined) {
    eventBus = new eventemitter3();
  }

  const EVENT_NAME = getID();

  let _state = initialState;

  const setState = (newValue: Readonly<T>) => {
    _state = newValue;
    eventBus?.emit(EVENT_NAME, _state);
  };

  function useOne(): [
    Readonly<T>,
    (newValue: Readonly<T>) => void
  ] {
    const updateCountRef = useRef(0);
    const [, setUpdateCount] = useState(0);

    useEffect(() => {
      function updater() {
        setUpdateCount(++updateCountRef.current);
      }
      eventBus.on(EVENT_NAME, updater);
      return () => {
        eventBus.off(EVENT_NAME, updater);
      };
    }, []);

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

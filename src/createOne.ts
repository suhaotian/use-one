import { useState, useEffect } from 'react';
import eventemitter3 from 'eventemitter3';
import { ReadonlyNonBasicType } from './types';

const MAX_UPDATE_COUNT_NUMBER = 100 * 1000;

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
    replaceState: (newValue: ReadonlyNonBasicType<T>) => void;
    subscribe: (cb: (state: ReadonlyNonBasicType<T>) => void) => () => void;
    /** emit update */
    forceUpdate: () => void;
    /** Get how many times we update */
    getUpdateCount: () => number;
  }
] {
  if (eventBus === undefined) {
    eventBus = new eventemitter3();
  }

  const EVENT_NAME = getID();

  let updateCountRef = 0;
  let _state = initialState;

  function emitUpdate() {
    eventBus?.emit(EVENT_NAME, _state);
  }

  // before setState
  const replaceState = (newValue: ReadonlyNonBasicType<T>) => {
    _state = newValue;
    emitUpdate();
  };

  function useOne(): [
    ReadonlyNonBasicType<T>,
    (newValue: ReadonlyNonBasicType<T>) => void
  ] {
    const [, setUpdateCount] = useState(0);

    useEffect(() => {
      function updater() {
        updateCountRef =
          updateCountRef < MAX_UPDATE_COUNT_NUMBER ? updateCountRef + 1 : 0;
        setUpdateCount(updateCountRef);
      }
      eventBus.on(EVENT_NAME, updater);

      return () => {
        eventBus.off(EVENT_NAME, updater);
        updateCountRef = 0;
      };
    }, []);

    return [_state, replaceState];
  }

  const store = {
    getState: () => _state,
    setState: (newState: ReadonlyNonBasicType<T>) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Please use replaceState, setState will remove at 1.0');
      }
      replaceState(newState);
    },
    replaceState,
    subscribe: (cb: (state: ReadonlyNonBasicType<T>) => void) => {
      eventBus.on(EVENT_NAME, cb);
      return () => {
        eventBus.off(EVENT_NAME, cb);
      };
    },
    forceUpdate: emitUpdate,
    getUpdateCount: () => updateCountRef,
  };
  return [useOne, store];
}

import { useState, useEffect, useLayoutEffect } from 'react';
import eventemitter3 from 'eventemitter3';
import { ReadonlyNonBasicType, OptionsType, StoreType, CBType } from './types';

const MAX_UPDATE_COUNT_NUMBER = 100 * 1000;

let ID = 0;
function getID() {
  ID++;
  return `${ID}`;
}

export let eventBus: eventemitter3;

export function createOne<T>(
  initialState: ReadonlyNonBasicType<T>,
  options?: OptionsType
): [
  /** Why so many ReadonlyNonBasicType here... */
  () => [ReadonlyNonBasicType<T>, CBType<T>],
  StoreType<T>
] {
  options = options || {
    useEffect: true,
  };

  const _useEffect =
    options.useEffect === undefined || options.useEffect
      ? useEffect
      : useLayoutEffect;

  if (eventBus === undefined) {
    eventBus = new eventemitter3();
  }

  const EVENT_NAME = getID();

  let updateCountRef = 0;
  let isDestroy = false;
  let _state = initialState;

  function emitUpdate() {
    if (isDestroy) {
      throw new Error(
        `The state ${options?.name || EVENT_NAME} already destroyed`
      );
    }
    eventBus?.emit(EVENT_NAME, _state);
  }

  // sync state without emit to rerender component
  const syncState = (newValue: ReadonlyNonBasicType<T>) => {
    _state = newValue;
  };

  // before this is setState
  const replaceState = (newValue: ReadonlyNonBasicType<T>) => {
    syncState(newValue);
    emitUpdate();
  };

  function useOne(): [ReadonlyNonBasicType<T>, CBType<T>] {
    const [, setUpdateCount] = useState(0);

    _useEffect(() => {
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
    subscribe: (cb: CBType<T>) => {
      eventBus.on(EVENT_NAME, cb);
      return () => {
        eventBus.off(EVENT_NAME, cb);
      };
    },
    forceUpdate: emitUpdate,
    syncState,
    getUpdateCount: () => updateCountRef,
    destroy: () => {
      eventBus.off(EVENT_NAME);
      isDestroy = true;
      (updateCountRef as any) = null;
      (_state as any) = null;
    },
  };
  return [useOne, store];
}

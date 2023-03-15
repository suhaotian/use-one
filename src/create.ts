import { useState, useEffect, useLayoutEffect } from 'react';
import eventemitter3 from 'eventemitter3';
import { ReadonlyNonBasic, createOptions } from './types';

let ID = 0;
function getID() {
  ID++;
  return `__${ID}`;
}

export const eventBus = new eventemitter3();

export function create<T>(
  initialState: ReadonlyNonBasic<T>,
  options?: createOptions
) {
  options = options || {
    useEffect: true,
  };

  const _useEffect =
    options.useEffect === undefined || options.useEffect
      ? useEffect
      : useLayoutEffect;

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

  // Sync state without emit to rerender component.
  // Useful for performance optimization in loop components (see example/TodoListExample.tsx)
  const syncState = (
    newValue:
      | ReadonlyNonBasic<T>
      | ((oldState: ReadonlyNonBasic<T>) => ReadonlyNonBasic<T>)
  ) => {
    _state =
      typeof newValue === 'function'
        ? (newValue as Function)(_state)
        : newValue;
  };

  const replaceState = (newValue: Parameters<typeof syncState>[0]) => {
    syncState(newValue);
    emitUpdate();
  };

  function useOne() {
    const [, setUpdateCount] = useState(0);

    _useEffect(() => {
      function updater() {
        updateCountRef++;
        setUpdateCount(updateCountRef);
      }
      eventBus.on(EVENT_NAME, updater);

      return () => {
        eventBus.off(EVENT_NAME, updater);
      };
    }, []);

    return [_state, replaceState] as const;
  }

  const store = {
    getState: () => _state,
    replaceState,
    subscribe: (callback: (state: ReadonlyNonBasic<T>) => void) => {
      eventBus.on(EVENT_NAME, callback);
      return () => {
        eventBus.off(EVENT_NAME, callback);
      };
    },
    forceUpdate: emitUpdate,
    syncState,
    getUpdateCount: () => updateCountRef,
    destroy: () => {
      eventBus.off(EVENT_NAME);
      isDestroy = true;
      (updateCountRef as unknown) = null;
      (_state as unknown) = null;
    },
  };
  return [useOne, store] as const;
}

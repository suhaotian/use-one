import { useState, useEffect, useLayoutEffect } from 'react';
import eventemitter3 from 'eventemitter3';
import { ReadonlyNonBasic, CreateOptions } from './types';

let ID = 0;
function getID() {
  ID++;
  return `__${ID}`;
}

export const eventBus = new eventemitter3();

/**
 * @deprecated Please use `create`, `createOne` will remove in 2.0
 */
export const createOne = create;

export function create<T>(
  initialState: ReadonlyNonBasic<T>,
  options?: CreateOptions
) {
  options = options || {
    useEffect: true,
  };

  const _useEffect =
    options.useEffect === undefined || options.useEffect
      ? useEffect
      : useLayoutEffect;

  const EVENT_NAME = getID();

  let updateCount = 0;
  let isDestroy = false;
  let _state = initialState;

  function emitUpdate() {
    if (isDestroy) {
      console.warn(
        `The state ${options?.name || EVENT_NAME} already destroyed`
      );
    }
    eventBus?.emit(EVENT_NAME, _state);
  }

  /*
   * Sync state without emit to rerender component
   */
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

  const setState = (newValue: Parameters<typeof syncState>[0]) => {
    syncState(newValue);
    emitUpdate();
  };

  function useOne() {
    const [, setUpdateCount] = useState(0);

    _useEffect(() => {
      function updater() {
        updateCount++;
        setUpdateCount(updateCount);
      }
      eventBus.on(EVENT_NAME, updater);

      return () => {
        eventBus.off(EVENT_NAME, updater);
      };
    }, []);

    return [_state, setState] as const;
  }

  const store = {
    getState: () => _state,
    /**
     * @deprecated Please use `.setState`, `.replaceState` will remove in 2.0
     */
    replaceState: setState,
    setState,
    forceUpdate: emitUpdate,
    syncState,
    subscribe: (callback: (state: ReadonlyNonBasic<T>) => void) => {
      eventBus.on(EVENT_NAME, callback);
      return () => {
        eventBus.off(EVENT_NAME, callback);
      };
    },
    getUpdateCount: () => updateCount,
    destroy: () => {
      eventBus.off(EVENT_NAME);
      isDestroy = true;
      (updateCount as unknown) = null;
      (_state as unknown) = null;
    },
  };
  return [useOne, store] as const;
}

import { useState, useEffect, useLayoutEffect } from 'react';
import { ReadonlyNonBasic, CreateOptions } from './types';
import { EventBus } from './bus';

let ID = 0;
function getID() {
  ID++;
  return `__${ID}`;
}

export const eventBus = new EventBus();

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
      // TODO warn
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
    setState,
    forceUpdate: emitUpdate,
    syncState,
    subscribe: (callback: (state: ReadonlyNonBasic<T>) => void) => {
      eventBus.on(EVENT_NAME, callback);
      return () => eventBus.off(EVENT_NAME, callback);
    },
    destroy: () => {
      eventBus.off(EVENT_NAME);
      isDestroy = true;
      (updateCount as unknown) = null;
      (_state as unknown) = null;
    },
  };
  return [useOne, store] as const;
}

export type Store = ReturnType<typeof create<any>>[1];

export type StrictPropertyCheck<T> = Exclude<
  keyof T,
  keyof Omit<T, keyof Store>
> extends never
  ? Omit<T, keyof Store>
  : {
      error: 'Extra properties detected';
      extraProperties: Exclude<keyof T, keyof Omit<T, keyof Store>>;
    };

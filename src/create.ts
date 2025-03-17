import { useState, useEffect, useLayoutEffect } from 'react';
import { ReadonlyNonBasic, CreateOptions } from './types';
import { EventBus } from './bus';

let ID = 0;
const getID = () => `__${++ID}`;

export const eventBus = new EventBus();

export function create<T>(
  initialState: ReadonlyNonBasic<T>,
  options?: CreateOptions
) {
  const _useEffect =
    !options?.useEffect === false ? useEffect : useLayoutEffect;
  const EVENT_NAME = getID();
  let updateCount = 0;
  let isDestroyed = false;
  let _state = initialState;

  const emitUpdate = () => {
    if (!isDestroyed) eventBus.emit(EVENT_NAME, _state);
  };

  const syncState = (
    newValue:
      | ReadonlyNonBasic<T>
      | ((s: ReadonlyNonBasic<T>) => ReadonlyNonBasic<T>)
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
    const [count, setUpdateCount] = useState(0);

    _useEffect(() => {
      const updater = () => setUpdateCount(++updateCount);
      eventBus.on(EVENT_NAME, updater);
      return () => eventBus.off(EVENT_NAME, updater);
    }, []);

    return [_state, setState, count] as const;
  }

  return [
    useOne,
    {
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
        isDestroyed = true;
        updateCount = 0;
        (_state as unknown) = null;
      },
    },
  ] as const;
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

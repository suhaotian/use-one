import { useState, useEffect, useLayoutEffect } from 'react';
import eventemitter3 from 'eventemitter3';
import {
  ReadonlyNonBasic,
  CreateOneOptions,
  UnsubscribeFunction,
} from './types';

let ID = 0;
function getID() {
  ID++;
  return `${ID}`;
}

export let eventBus: eventemitter3;

export function createOne<T>(
  initialState: ReadonlyNonBasic<T>,
  options?: CreateOneOptions
): [
  /** Returns a stateful value, and a function to update it. */
  () => [
    /** the readonly state */
    ReadonlyNonBasic<T>,
    /** the function that update state to new state */
    (newState: ReadonlyNonBasic<T>) => void
  ],
  {
    /** get the state */
    getState: () => ReadonlyNonBasic<T>;
    /** set the state with the new state */
    replaceState: (newState: ReadonlyNonBasic<T>) => void;
    /* sync state without emit update */
    syncState: (newState: ReadonlyNonBasic<T>) => void;
    /* subscribe state update, return a unsubscribe function */
    subscribe: (
      callback: (state: ReadonlyNonBasic<T>) => void
    ) => UnsubscribeFunction;
    /* emit update */
    forceUpdate: () => void;
    /* remove alll subscribe event and clear internal count */
    destroy: () => void;
    /* get how many times we emit update */
    getUpdateCount: () => number;
  }
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

  // Sync state without emit to rerender component.
  // Useful for performance optimization in loop components (see example/TodoListExample.tsx)
  const syncState = (newValue: ReadonlyNonBasic<T>) => {
    _state = newValue;
  };

  const replaceState = (newValue: ReadonlyNonBasic<T>) => {
    syncState(newValue);
    emitUpdate();
  };

  function useOne(): [
    ReadonlyNonBasic<T>,
    (newState: ReadonlyNonBasic<T>) => void
  ] {
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

    return [_state, replaceState];
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
      (updateCountRef as any) = null;
      (_state as any) = null;
    },
  };
  return [useOne, store];
}

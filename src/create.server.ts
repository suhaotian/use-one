import 'server-only';
import { ReadonlyNonBasic, CreateOptions } from './types';

/**
 * @deprecated Please use `create`, `createOne` will remove in 2.0
 */
export const createOne = create;

export function create<T>(
  initialState: ReadonlyNonBasic<T>,
  options?: CreateOptions
) {
  let isDestroy = false;
  let _state = initialState;

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

  const setState = syncState;

  function useOne() {
    return [_state, setState] as const;
  }

  const store = {
    getState: () => _state,
    /**
     * @deprecated Please use `.setState`, `.replaceState` will remove in 2.0
     */
    replaceState: setState,
    setState,
    forceUpdate: () => {},
    syncState,
    subscribe: (_callback: (state: ReadonlyNonBasic<T>) => void) => {
      return () => {
        //
      };
    },
    getUpdateCount: () => 0,
    destroy: () => {
      isDestroy = true;
      (_state as unknown) = null;
    },
  };
  return [useOne, store] as const;
}

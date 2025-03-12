import { useRef, useEffect, useState, useMemo } from 'react';
import { debounce, type Cache } from './get-persist';

interface CreateOptions {
  /** debounce ms, default 100ms */
  debounce: number;
  /** update value from storage if have */
  cache: Cache;
}

export interface Options<T> {
  /** storage key */
  key: string;
  /** update the state from cache */
  setState: (state: T) => void;
  /** get state save to cache */
  getState: () => T;
}

export function createPersist(options: CreateOptions) {
  const { getItem, setItem: _setItem, removeItem } = options.cache;
  const setItem = debounce(_setItem, options.debounce);
  
  return function usePersist<T = any>({ key, setState, getState }: Options<T>) {
    const [count, setForceUpdate] = useState(0);
    const initedRef = useRef(false);

    useEffect(() => {
      if (initedRef.current) return;
      initedRef.current = true;
      
      (async () => {
        const result = await getItem(key);
        if (result) {
          setState(result);
        }
        setForceUpdate(count => count + 1); // Fixed: 'key' parameter renamed to 'count'
      })();
    }, [key]); // Added key dependency

    const state = getState();
    useEffect(() => {
      if (initedRef.current) {
        setItem(key, state);
      }
    }, [state, key]); // Added key dependency, removed initedRef dependency

    function clearItem() {
      return removeItem(key);
    }
    
    const ready = useMemo(() => initedRef.current, [count]); // Removed redundant initedRef dependency
    
    return [ready, clearItem] as const;
  };
}
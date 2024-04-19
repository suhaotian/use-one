import type { Store } from '../create';

export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};

const defaultTransform = (state: any) => state;

export function getPersistStore(
  storeCache: {
    setItem: (key: string, state: unknown) => Promise<void> | void;
    getItem: (key: string) => Promise<any> | any;
    removeItem: (key: string) => Promise<void> | void;
  },
  isClient: boolean
) {
  function wrapState<T = any>(state: T) {
    return {
      ...state,
      ready: isClient ? false : true,
    };
  }
  async function persistStore<T = any>(
    store: Store,
    options: {
      key: string;
      debounce?: number;
      cache?: {
        setItem: (key: string, state: unknown) => Promise<void> | void;
        getItem: (key: string) => Promise<any> | any;
        removeItem: (key: string) => Promise<void> | void;
      };
      transform?: (state: T) => T;
    }
  ) {
    const cache = options?.cache || storeCache;
    const transform = options?.transform || defaultTransform;
    const result = await cache.getItem(options.key);
    store.setState(
      transform({
        ...(result || {}),
        ready: true,
      })
    );
    const ms = options?.debounce === undefined ? 100 : options?.debounce;
    const setItem = debounce((key: string, state: unknown) => {
      cache.setItem(key, state);
    }, ms);

    return store.subscribe((state: unknown) => {
      setItem(options.key, state);
    });
  }

  return { wrapState, persistStore };
}

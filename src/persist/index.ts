// @ts-ignore
import type { Store } from 'use-one';
// @ts-ignore
import defaultWebCacheAdapter, { isClient } from 'use-one/persist/cache';

export { isClient };
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

export function wrapState<T = any>(state: T) {
  return {
    ...state,
    ready: isClient ? false : true,
  };
}

export async function persistStore(
  store: Store,
  options: {
    key: string;
    debounce?: number;
    cache?: {
      setItem: (key: string, state: unknown) => Promise<void> | void;
      getItem: (key: string) => Promise<any> | any;
      removeItem: (key: string) => Promise<void> | void;
    };
  }
) {
  const cache = options?.cache || defaultWebCacheAdapter;
  const result = await cache.getItem(options.key);
  store.setState({
    ...(result || {}),
    ready: true,
  });
  const ms = options?.debounce === undefined ? 100 : options?.debounce;
  const setItem = debounce((key: string, state: unknown) => {
    cache.setItem(key, state);
  }, ms);

  return store.subscribe((state: unknown) => {
    setItem(options.key, state);
  });
}

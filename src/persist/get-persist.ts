import { Store, eventBus } from '../create';

const defaultTransform = (state: any) => state;
export function getPersistStore(storeCache: Cache, isClient: boolean) {
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
      cache?: Cache;
      transform?: (state: T) => T;
    }
  ) {
    const cache = options?.cache || storeCache;
    const transform = options?.transform || defaultTransform;
    const result = await cache.getItem(options.key);
    store.setState((state: any) => {
      return transform({
        ...state,
        ...(result || {}),
        ready: true,
      });
    });
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

export interface Cache {
  setItem: (key: string, state: unknown) => Promise<void> | void;
  getItem: (key: string) => Promise<any> | any;
  removeItem: (key: string) => Promise<void> | void;
}

export function debounce<T extends Function>(cb: T, wait = 100) {
  let h: ReturnType<typeof setTimeout>;
  let callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait);
  };
  return <T>(<any>callable);
}

export function subscribeStore(fn: () => void) {
  eventBus.on('sync-persist', fn);
}

export function emitSyncStore() {
  eventBus.emit('sync-persist');
}

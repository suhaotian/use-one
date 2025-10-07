import { Store, eventBus } from '../create';

export interface Cache {
  setItem: (key: string, state: string) => Promise<void> | void;
  getItem: (key: string) => Promise<string | null> | string | null;
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

export function getPersistStore(storeCache: Cache, isClient: boolean) {
  function wrapState<T = any>(state: T) {
    return {
      ...state,
      ready: !isClient,
    };
  }

  async function persistStore<T = any>(
    store: Store,
    options: {
      key: string;
      debounce?: number;
      cache?: Cache;
      encode?: (state: T) => string;
      decode?: (data: string) => T;
      transform?: (state: T) => T;
    }
  ) {
    const cache = options?.cache || storeCache;
    const transform = options?.transform || ((state) => state);
    const encode = options?.encode || ((state) => JSON.stringify(state));
    const decode = options?.decode || ((data: string) => JSON.parse(data));
    const data = await cache.getItem(options.key);

    if (data !== null && data !== undefined) {
      const state = transform(decode(data) as T);
      store.setState((current: any) => ({
        ...current,
        ...state,
        ready: true,
      }));
    } else {
      store.setState((current: any) => ({
        ...current,
        ready: true,
      }));
    }

    const ms = options?.debounce ?? 100;
    const setItem = debounce((key: string, state: T) => {
      cache.setItem(key, encode(state));
    }, ms);

    const unsubscribe = store.subscribe((state: T) => {
      setItem(options.key, state);
    });

    return unsubscribe;
  }

  return { wrapState, persistStore };
}

const PERSIST_KEY = 'persist';

export function onPersistReady(fn: () => void) {
  eventBus.on(PERSIST_KEY, fn);
}

export function emitPersistReady() {
  eventBus.emit(PERSIST_KEY);
}

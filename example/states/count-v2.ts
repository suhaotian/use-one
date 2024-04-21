import { produce } from 'immer';
import { create } from '../../src';

const initialState = { count: 0 };
const [use, store] = create(initialState);

const computed = {
  get state() {
    return store.getState();
  },
};

const actions = {
  produce(cb: (state: typeof initialState) => void) {
    store.setState(produce(cb));
  },
  increment() {
    this.produce((state) => {
      state.count++;
    });
  },
  decrement() {
    this.produce((state) => {
      state.count--;
    });
  },
};

export const countStore = Object.assign(
  {
    ...computed,
    ...actions,
    use,
  },
  store
);

type Store = ReturnType<typeof create>[1];

const WebCache = {
  setItem(key: string, state) {
    localStorage.setItem(key, JSON.stringify(state));
  },
  getItem(key: string) {
    const result = localStorage.getItem(key);
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        localStorage.removeItem(key);
      }
    }
    return null;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

const RNCache = {
  setItem(key: string, state) {
    localStorage.setItem(key, JSON.stringify(state));
  },
  getItem(key: string) {
    const result = localStorage.getItem(key);
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        localStorage.removeItem(key);
      }
    }
    return null;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export async function persistStore(
  store: Store,
  options: {
    key: string;
    cache?: {
      setItem: (key: string, state) => Promise<void> | void;
      getItem: (key: string) => Promise<any> | any;
      removeItem: (key: string) => Promise<void> | void;
    };
  }
) {
  const cache = options?.cache || WebCache;
  const result = await cache.getItem(options.key);
  if (result) {
    try {
      const state = JSON.parse(result);
      store.setState(state);
    } catch (e) {
      await cache.removeItem(options.key);
    }
  }
  return store.subscribe((state) => {
    cache.setItem(options.key, JSON.stringify(state));
  });
}

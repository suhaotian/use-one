import type { Options } from './create-persist';
import { getPersistStore, debounce } from './get-persist';

export * from './provider';

export const isClient = typeof document !== 'undefined';
const obj: any = {};
const cacheStore = {
  setItem(key: string, state: unknown) {
    obj[key] = state;
  },
  getItem(key: string) {
    return obj[key];
  },
  removeItem(key: string) {
    delete obj[key];
  },
};
const { wrapState, persistStore } = getPersistStore(cacheStore, isClient);
export { debounce, wrapState, persistStore };
export const usePersist = (_options: Options<any>) => [() => null, true];

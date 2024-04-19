import { getPersistStore, debounce } from './get-persist';

export const isClient = typeof document !== 'undefined';

const cacheStore = {
  setItem(key: string, state: unknown) {
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
const { wrapState, persistStore } = getPersistStore(cacheStore, isClient);
export { debounce, wrapState, persistStore };

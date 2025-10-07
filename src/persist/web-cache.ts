import type { Cache } from './get-persist';

const webCache: Cache = {
  setItem(key: string, state: string) {
    localStorage.setItem(key, state);
  },
  getItem(key: string) {
    const result = localStorage.getItem(key);
    return result;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export const webSessionCache = {
  setItem(key: string, state: string) {
    sessionStorage.setItem(key, state);
  },
  getItem(key: string) {
    const result = sessionStorage.getItem(key);
    return result;
  },
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  },
};

export default webCache;

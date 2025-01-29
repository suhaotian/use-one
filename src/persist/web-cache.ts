const webCache = {
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

export const webSessionCache = {
  setItem(key: string, state: unknown) {
    sessionStorage.setItem(key, JSON.stringify(state));
  },
  getItem(key: string) {
    const result = sessionStorage.getItem(key);
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        sessionStorage.removeItem(key);
      }
    }
    return null;
  },
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  },
};

export default webCache;

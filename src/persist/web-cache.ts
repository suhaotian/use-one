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

export default webCache;
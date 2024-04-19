import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPersistStore, debounce } from './get-persist';

const cacheStore = {
  setItem(key: string, state: unknown) {
    return AsyncStorage.setItem(key, JSON.stringify(state));
  },
  async getItem(key: string) {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        AsyncStorage.removeItem(key).catch(() => {
          //
        });
      }
    }
    return null;
  },
  removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  },
};

export const isClient = true;
const { wrapState, persistStore } = getPersistStore(cacheStore, isClient);

export { debounce, wrapState, persistStore };

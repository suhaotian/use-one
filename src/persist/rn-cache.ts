import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Cache } from './get-persist';

const RNCache: Cache = {
  setItem(key: string, state: string) {
    return AsyncStorage.setItem(key, state);
  },
  async getItem(key: string) {
    const result = await AsyncStorage.getItem(key);
    return result;
  },
  removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  },
};

export default RNCache;

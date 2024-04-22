import AsyncStorage from '@react-native-async-storage/async-storage';

const RNCache = {
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

export default RNCache;

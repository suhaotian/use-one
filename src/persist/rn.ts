import AsyncStorage from '@react-native-async-storage/async-storage';

export const isClient = true;

export default {
  setItem(key: string, state: unknown) {
    return AsyncStorage.setItem(key, JSON.stringify(state));
  },
  async getItem(key: string) {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        AsyncStorage.removeItem(key).catch((e) => {
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

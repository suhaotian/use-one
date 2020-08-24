import { fontSizeStore, fontSizeInitialState } from './useFontSize';

export const fontSizeActions = {
  reset() {
    fontSizeStore.replaceState(fontSizeInitialState);
  },
}
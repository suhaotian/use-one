import { fontSizeStore, fontSizeInitialState } from './useFontSize';
import { FontSizeInitialStateType } from './types';


export const fontSizeSelectors = {
  getState(): FontSizeInitialStateType  {
    return fontSizeStore.getState(); 
  },
}
import { countStore, countInitialState } from './useCount';
import { CountInitialStateType } from './types';


export const countSelectors = {
  getState(): CountInitialStateType  {
    return countStore.getState(); 
  },
  getCount(): CountInitialStateType  {
    return countStore.getState(); 
  },
}
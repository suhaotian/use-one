import { todoInputValueStore, todoInputValueInitialState } from './useTodoInputValue';
import { TodoInputValueInitialStateType } from './types';


export const todoInputValueSelectors = {
  getState(): TodoInputValueInitialStateType  {
    return todoInputValueStore.getState(); 
  },
}
import {
  todoInputValueStore,
  todoInputValueInitialState,
} from './useTodoInputValue';

export const todoInputValueActions = {
  reset() {
    todoInputValueStore.replaceState(todoInputValueInitialState);
  },
  changeValue(newValue: string) {
    todoInputValueStore.replaceState(newValue);
  },
};

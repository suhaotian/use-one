/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { createOne } from '../../src';

let initialState = '';

export type TodoInputValueStateType = Readonly<typeof initialState>;

export const todoInputValueInitialState: TodoInputValueStateType = initialState;

const [useTodoInputValue, todoInputValueStore] = createOne<
  TodoInputValueStateType
>(todoInputValueInitialState);
export { useTodoInputValue, todoInputValueStore };

export const todoInputValueSelectors = {
  get state(): TodoInputValueStateType {
    return todoInputValueStore.getState();
  },
};

export const todoInputValueActions = {
  reset() {
    todoInputValueStore.replaceState(todoInputValueInitialState);
  },
  changeValue(value: string) {
    todoInputValueStore.replaceState(value);
  },
};

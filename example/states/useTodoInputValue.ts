/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';

let initialState = '';

export type TodoInputValueStateType = Readonly<typeof initialState>;

export const todoInputValueInitialState: TodoInputValueStateType = initialState;

const [useTodoInputValue, todoInputValueStore] = create<
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
    todoInputValueStore.setState(todoInputValueInitialState);
  },
  changeValue(value: string) {
    todoInputValueStore.setState(value);
  },
};

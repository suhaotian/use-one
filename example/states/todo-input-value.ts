/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';

let initialState = '';

export type TodoInputValueStateType = Readonly<typeof initialState>;
export const todoInputValueInitialState: TodoInputValueStateType = initialState;

const [use, store] = create<TodoInputValueStateType>(
  todoInputValueInitialState
);

const selectors = {
  get state(): TodoInputValueStateType {
    return store.getState();
  },
};

const actions = {
  reset() {
    store.setState(todoInputValueInitialState);
  },
  changeValue(value: string) {
    store.setState(value);
  },
};

export const todoInputValueStore = Object.assign(
  selectors,
  actions,
  { use },
  store
);

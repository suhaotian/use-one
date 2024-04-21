/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';

export enum TodoFilterEnum {
  'Show ALL' = 'Show ALL',
  'Show Completed' = 'Show Completed',
  'Show Uncompleted' = 'Show Uncompleted',
}

let initialState = TodoFilterEnum['Show ALL'];
export type TodoFilterStateType = Readonly<TodoFilterEnum>;
export const todoFilterInitialState: TodoFilterStateType = initialState;

const [use, store] = create<TodoFilterStateType>(todoFilterInitialState);

const selectors = {
  get state(): TodoFilterStateType {
    return store.getState();
  },
};

const actions = {
  reset() {
    store.setState(todoFilterInitialState);
  },
  updateFilter: (value: TodoFilterEnum) => {
    store.setState(value);
  },
};

export const todoFilterStore = Object.assign(
  selectors,
  actions,
  { use },
  store
);

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

const [useTodoFilter, todoFilterStore] = create<TodoFilterStateType>(
  todoFilterInitialState
);
export { useTodoFilter, todoFilterStore };

export const todoFilterSelectors = {
  get state(): TodoFilterStateType {
    return todoFilterStore.getState();
  },
};

export const todoFilterActions = {
  reset() {
    todoFilterStore.setState(todoFilterInitialState);
  },

  updateFilter: (value: TodoFilterEnum) => {
    todoFilterStore.setState(value);
  },
};

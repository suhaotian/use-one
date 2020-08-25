/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { createOne } from 'use-one';

export enum TodoFilterEnum {
  'Show ALL' = 'Show ALL',
  'Show Completed' = 'Show Completed',
  'Show Uncompleted' = 'Show Uncompleted',
}

let initialState = TodoFilterEnum['Show ALL'];

export type TodoFilterStateType = Readonly<TodoFilterEnum>;

export const todoFilterInitialState: TodoFilterStateType = initialState;

const [useTodoFilter, todoFilterStore] = createOne<TodoFilterStateType>(
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
    todoFilterStore.replaceState(todoFilterInitialState);
  },

  updateFilter: (value: TodoFilterEnum) => {
    todoFilterStore.replaceState(value);
  },
};

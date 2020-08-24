import { todoFilterStore, todoFilterInitialState } from './useTodoFilter';
import { TodoFilterEnum } from './types';

export const todoFilterActions = {
  reset() {
    todoFilterStore.replaceState(todoFilterInitialState);
  },

  updateFilter: (value: TodoFilterEnum) => {
    todoFilterStore.replaceState(value);
  },
};

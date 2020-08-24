import { todoFilterStore, todoFilterInitialState } from './useTodoFilter';
import { TodoFilterInitialStateType, TodoFilterEnum } from './types';

export const todoFilterSelectors = {
  getState(): TodoFilterInitialStateType {
    return todoFilterStore.getState();
  },

  updateFilter: (value: TodoFilterEnum) => {
    todoFilterStore.replaceState(value);
  },
};

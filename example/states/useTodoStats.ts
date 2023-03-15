/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';
import { todoListStore, todoListSelectors } from './todoList';

let initialState = {
  totalNum: 0,
  totalCompletedNum: 0,
  totalUncompletedNum: 0,
  percentCompleted: 0,
  formattedPercentCompleted: 0,
};

export type TodoStatsStateType = Readonly<typeof initialState>;

export const todoStatsInitialState: TodoStatsStateType = initialState;

const [useTodoStats, todoStatsStore] = create(todoStatsInitialState);

export { useTodoStats, todoStatsStore };

export const unsubscribe = todoListStore.subscribe(() => {
  todoStatsStore.replaceState(todoListSelectors.getStats());
});

export const todoStatsSelectors = {
  get state(): TodoStatsStateType {
    return todoStatsStore.getState();
  },
};

export const todoStatsActions = {
  reset() {
    todoStatsStore.replaceState(todoStatsInitialState);
  },
  updateStats() {
    todoStatsStore.replaceState(todoListSelectors.getStats());
  },
};

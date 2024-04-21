/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';
import { todoListStore } from './todo-list';

let initialState = {
  totalNum: 0,
  totalCompletedNum: 0,
  totalUncompletedNum: 0,
  percentCompleted: 0,
  formattedPercentCompleted: 0,
};
export type TodoStatsStateType = Readonly<typeof initialState>;
export const todoStatsInitialState: TodoStatsStateType = initialState;

const [use, store] = create(todoStatsInitialState);

const selectors = {
  get state(): TodoStatsStateType {
    return store.getState();
  },
};

const actions = {
  reset() {
    store.setState(todoStatsInitialState);
  },
  updateStats() {
    store.setState(todoListStore.getStats());
  },
};

export const todoStatsStore = Object.assign(selectors, actions, { use }, store);

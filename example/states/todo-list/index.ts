import { create, isClient, persistStore } from '../../../src';
import { TodoListState, initialState } from './types';
import { getActions } from './actions';
import { todoStatsStore } from '../todo-stats';

const [use, store] = create<TodoListState>(initialState);
isClient && persistStore(store, { key: '@todo-list' });

export const todoListStore = Object.assign(
  getActions(store, initialState),
  { use },
  store
);
todoListStore.subscribe(() => {
  todoStatsStore.setState(todoListStore.getStats());
});

export * from './utils';
export * from './types';

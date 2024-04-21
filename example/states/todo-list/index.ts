import { create, isClient, persistStore } from '../../../src';
import { TodoListState, initialState } from './types';
import { getActions } from './actions';
import { getSelectors } from './selectors';
import { todoStatsStore } from '../todo-stats';
import { setId } from './utils';

const [use, store] = create<TodoListState>(initialState);
(async () => {
  await (isClient && persistStore(store, { key: '@todo-list' }));
  const maxId = store
    .getState()
    .todos.map((item) => item.id)
    .sort((a, b) => b - a)[0];
  console.log(maxId);
  if (maxId) {
    setId(maxId);
  }
})();

export const todoListStore = Object.assign(
  getActions(store, initialState),
  getSelectors(store, initialState),
  { use },
  store
);
todoListStore.subscribe(() => {
  todoStatsStore.setState(todoListStore.getStats());
});

export * from './utils';
export * from './types';

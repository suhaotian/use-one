import type { TodoListStore, TodoListState, TodoItemType } from './types';
import { getId, replaceItemAtIndex, removeItemAtIndex } from './utils';
import { getSelectors } from './selectors';
import { todoStatsStore } from '../todo-stats';
import { todoInputValueStore } from '../todo-input-value';

export const getActions = (
  store: TodoListStore,
  initialState: TodoListState
) => {
  const selectors = getSelectors(store, initialState);
  return {
    ...selectors,
    reset() {
      store.setState(initialState);
    },
    addItem: () => {
      store.setState({
        ...store.getState(),
        todos: [
          ...store.getState().todos,
          {
            id: getId(),
            text: todoInputValueStore.getState(),
            isComplete: false,
          },
        ],
      });
      todoInputValueStore.changeValue('');
    },

    editItemText: (updatedItem: TodoItemType) => {
      const newList = replaceItemAtIndex(
        store.getState(),
        updatedItem.id,
        updatedItem
      );

      store.syncState((state) => ({ ...state, todos: newList }));
    },

    toggleItemCompletion: (updatedItem: TodoItemType) => {
      const newList = replaceItemAtIndex(
        store.getState(),
        updatedItem.id,
        updatedItem
      );
      store.syncState((state) => ({ ...state, todos: newList }));

      /** update stats */
      todoStatsStore.updateStats();
    },

    deleteItem: (item: TodoItemType) => {
      const newList = removeItemAtIndex(store.getState(), item.id);
      store.syncState((state) => ({ ...state, todos: newList }));
    },
  };
};

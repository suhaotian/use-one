import { todoListStore, todoListInitialState } from './useTodoList';
import { TodoItemType } from './types';
import { getId, replaceItemAtIndex, removeItemAtIndex } from './utils';
import {
  todoInputValueActions,
  todoInputValueStore,
} from '../useTodoInputValue';
import { todoListSelectors } from './selectors';
import { todoStatsStore, todoStatsActions } from '../useTodoStats';

export const todoListActions = {
  reset() {
    todoListStore.replaceState(todoListInitialState);
  },

  addItem: () => {
    todoListStore.replaceState([
      ...todoListStore.getState(),
      {
        id: getId(),
        text: todoInputValueStore.getState(),
        isComplete: false,
      },
    ]);
    todoInputValueActions.changeValue('');
  },

  editItemText: (updatedItem: TodoItemType) => {
    const newList = replaceItemAtIndex(
      todoListStore.getState(),
      updatedItem.id,
      updatedItem
    );

    todoListStore.syncState(newList);
  },

  toggleItemCompletion: (updatedItem: TodoItemType) => {
    const newList = replaceItemAtIndex(
      todoListStore.getState(),
      updatedItem.id,
      updatedItem
    );
    todoListStore.syncState(newList);

    /** update stats */
    todoStatsActions.updateStats();
  },

  deleteItem: (item: TodoItemType) => {
    const newList = removeItemAtIndex(todoListStore.getState(), item.id);
    todoListStore.replaceState(newList);
  },
};

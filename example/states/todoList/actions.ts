import { todoListStore, todoListInitialState } from './useTodoList';
import { TodoItemType } from './types';
import { getId, replaceItemAtIndex, removeItemAtIndex } from './utils';
import {
  todoInputValueActions,
  todoInputValueStore,
} from '../useTodoInputValue';
import { todoStatsActions } from '../useTodoStats';

export const todoListActions = {
  reset() {
    todoListStore.setState(todoListInitialState);
  },

  addItem: () => {
    todoListStore.setState([
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
    todoListStore.setState(newList);
  },
};

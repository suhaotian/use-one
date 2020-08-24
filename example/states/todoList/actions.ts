import { todoListStore, todoListInitialState } from './useTodoList';
import { TodoFilterEnum } from '../todoFilter/types';
import { TodoItemType } from './types';
import { getId, replaceItemAtIndex, removeItemAtIndex } from './utils';
import { todoInputValueActions, todoInputValueStore } from '../todoInputValue';
import { todoFilterStore } from '../todoFilter';

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

  editItemText: (value: string, item: TodoItemType) => {
    const newList = replaceItemAtIndex(todoListStore.getState(), item.id, {
      ...item,
      text: value,
    });

    todoListStore.setState(newList);
  },

  toggleItemCompletion: (item: TodoItemType) => {
    const newList = replaceItemAtIndex(todoListStore.getState(), item.id, {
      ...item,
      isComplete: !item.isComplete,
    });

    todoListStore.replaceState(newList);
  },

  deleteItem: (item: TodoItemType) => {
    const newList = removeItemAtIndex(todoListStore.getState(), item.id);
    todoListStore.replaceState(newList);
  },
};

import type { TodoListStore, TodoListState, TodoItemType } from './types';
import { todoFilterStore, TodoFilterEnum } from '../todo-filter';

export const getSelectors = (
  store: TodoListStore,
  initialState: TodoListState
) => ({
  initialState,
  state() {
    return store.getState();
  },

  getFilterList: () => {
    const todoList = store.getState().todos;
    const todoFilter = todoFilterStore.getState();
    if (todoFilter === TodoFilterEnum['Show ALL']) return todoList;
    if (todoFilter === TodoFilterEnum['Show Completed'])
      return todoList.filter((item) => item.isComplete);
    if (todoFilter === TodoFilterEnum['Show Uncompleted'])
      return todoList.filter((item) => !item.isComplete);
    return todoList;
  },

  getStats: () => {
    const todoList = store.getState().todos;
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
    const formattedPercentCompleted = Math.round(percentCompleted * 100);
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
      formattedPercentCompleted,
    };
  },

  getItem: (id: number) => {
    const todoList = store.getState().todos;
    return todoList.find((item) => item.id === id) as any as TodoItemType;
  },
});

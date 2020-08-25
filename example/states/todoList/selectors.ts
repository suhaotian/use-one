import { todoListStore } from './useTodoList';
import { TodoListStateType, TodoItemType } from './types';
import { todoFilterStore, TodoFilterEnum } from '../../states/useTodoFilter';

export const todoListSelectors = {
  getState(): TodoListStateType {
    return todoListStore.getState();
  },

  getFilterList: () => {
    const todoList = todoListStore.getState();
    const todoFilter = todoFilterStore.getState();

    if (todoFilter === TodoFilterEnum['Show ALL']) return todoList;
    if (todoFilter === TodoFilterEnum['Show Completed'])
      return todoList.filter(item => item.isComplete);
    if (todoFilter === TodoFilterEnum['Show Uncompleted'])
      return todoList.filter(item => !item.isComplete);
    return todoList;
  },

  getStats: () => {
    const todoList = todoListStore.getState();

    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter(item => item.isComplete).length;
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
    const todoList = todoListStore.getState();

    return (todoList.find(item => item.id === id) as any) as TodoItemType;
  },
};

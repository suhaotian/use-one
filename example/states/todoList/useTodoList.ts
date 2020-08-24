import { createOne } from 'use-one';
import { TodoItemType } from './types';

let initialState: TodoItemType[] = [];

export type TodoListInitialStateType = Readonly<typeof initialState>;

export const todoListInitialState: TodoListInitialStateType = initialState;

const [useTodoList, todoListStore] = createOne<TodoListInitialStateType>(
  todoListInitialState
);
export { useTodoList, todoListStore };

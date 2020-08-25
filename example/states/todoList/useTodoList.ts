import { createOne } from '../../../src';
import { TodoItemType } from './types';

let initialState: Readonly<TodoItemType>[] = [];

export type TodoListStateType = Readonly<typeof initialState>;

export const todoListInitialState: TodoListStateType = initialState;

const [useTodoList, todoListStore] = createOne<TodoListStateType>(
  todoListInitialState
);
export { useTodoList, todoListStore };

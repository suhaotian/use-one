import { create } from '../../../src';

export const initialState = {
  todos: [] as TodoItemType[],
  ready: false,
};

export type TodoListState = Readonly<typeof initialState>;
export type TodoListStore = ReturnType<typeof create<TodoListState>>[1];

export interface TodoItemType {
  id: number;
  text: string;
  isComplete: boolean;
}

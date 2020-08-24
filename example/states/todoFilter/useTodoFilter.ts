import { createOne } from 'use-one';
import { TodoFilterEnum } from './types';

let initialState = TodoFilterEnum["Show ALL"];

export type TodoFilterInitialStateType = Readonly<TodoFilterEnum>;

export const todoFilterInitialState: TodoFilterInitialStateType = initialState;

const [useTodoFilter, todoFilterStore] = createOne<TodoFilterInitialStateType>(todoFilterInitialState);
export { useTodoFilter, todoFilterStore };

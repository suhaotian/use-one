import { createOne } from 'use-one';

let initialState = '';

export type TodoInputValueInitialStateType = Readonly<typeof initialState>;

export const todoInputValueInitialState: TodoInputValueInitialStateType = initialState;

const [useTodoInputValue, todoInputValueStore] = createOne<TodoInputValueInitialStateType>(todoInputValueInitialState);
export { useTodoInputValue, todoInputValueStore };

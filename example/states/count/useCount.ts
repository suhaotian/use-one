import { createOne } from 'use-one';

let initialState = 0;

export type CountInitialStateType = Readonly<typeof initialState>;

export const countInitialState: CountInitialStateType = initialState;

const [useCount, countStore] = createOne<CountInitialStateType>(countInitialState);
export { useCount, countStore };

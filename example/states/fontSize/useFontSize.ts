import { createOne } from 'use-one';

let initialState = 14;

export type FontSizeInitialStateType = Readonly<typeof initialState>;

export const fontSizeInitialState: FontSizeInitialStateType = initialState;

const [useFontSize, fontSizeStore] = createOne<FontSizeInitialStateType>(fontSizeInitialState);
export { useFontSize, fontSizeStore };

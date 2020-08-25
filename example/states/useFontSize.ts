/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { createOne } from 'use-one';

let initialState = 14;

export type FontSizeStateType = Readonly<typeof initialState>;

export const fontSizeInitialState: FontSizeStateType = initialState;

const [useFontSize, fontSizeStore] = createOne<FontSizeStateType>(
  fontSizeInitialState
);
export { useFontSize, fontSizeStore };

export const fontSizeSelectors = {
  get state(): FontSizeStateType {
    return fontSizeStore.getState();
  },
};

export const fontSizeActions = {
  reset() {
    fontSizeStore.replaceState(fontSizeInitialState);
  },
};

/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';

let initialState = 14;

export type FontSizeStateType = Readonly<typeof initialState>;

export const fontSizeInitialState: FontSizeStateType = initialState;

const [use, store] = create<FontSizeStateType>(fontSizeInitialState);

export const selectors = {
  get state(): FontSizeStateType {
    return store.getState();
  },
};

export const actions = {
  reset() {
    store.setState(fontSizeInitialState);
  },
};

export const fontSizeStore = Object.assign(selectors, actions, { use }, store);

/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';

let initialState = 0;

export type CountStateType = Readonly<typeof initialState>;

export const countInitialState: CountStateType = initialState;

const [use, store] = create<CountStateType>(countInitialState);

const selectors = {
  get state(): CountStateType {
    return store.getState();
  },
  get count(): CountStateType {
    return store.getState();
  },
};

const actions = {
  reset() {
    store.setState(() => countInitialState);
  },
  '+1': () => {
    store.setState((count) => count + 1);
  },
  '-1': () => {
    store.setState((count) => count - 1);
  },
  'async+1': async (ms: number) => {
    /* @todo need to clearTimeout */
    setTimeout(() => {
      store.setState((count) => count + 1);
    }, ms);
  },
};

export const countStore = Object.assign(selectors, actions, { use }, store);

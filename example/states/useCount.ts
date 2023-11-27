/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { create } from '../../src';

let initialState = 0;

export type CountStateType = Readonly<typeof initialState>;

export const countInitialState: CountStateType = initialState;

const [useCount, countStore] = create<CountStateType>(countInitialState);
export { useCount, countStore };

export const countSelectors = {
  get state(): CountStateType {
    return countStore.getState();
  },
  get count(): CountStateType {
    return countStore.getState();
  },
};

export const countActions = {
  reset() {
    countStore.setState(() => countInitialState);
  },
  '+1': () => {
    countStore.setState((count) => count + 1);
  },
  '-1': () => {
    countStore.setState((count) => count - 1);
  },
  'async+1': async (ms: number) => {
    /* @todo need to clearTimeout */
    setTimeout(() => {
      countStore.setState((count) => count + 1);
    }, ms);
  },
};

/** Generator by `use-one-templates` https://github.com/suhaotian/use-one-templates */

import { createOne } from '../../src';

let initialState = 0;

export type CountStateType = Readonly<typeof initialState>;

export const countInitialState: CountStateType = initialState;

const [useCount, countStore] = createOne<CountStateType>(countInitialState);
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
    countStore.replaceState(countInitialState);
  },
  '+1': () => {
    countStore.replaceState(countSelectors.count + 1);
  },
  '-1': () => {
    countStore.replaceState(countSelectors.count + 1);
  },
  'async+1': async (ms: number) => {
    /* @todo need to clearTimeout */
    setTimeout(() => {
      countStore.replaceState(countSelectors.count + 1);
    }, ms);
  },
};

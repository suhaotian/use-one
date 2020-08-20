// example

import { createOne } from '../../src';

const initialState = { count: 0 };

type CountStateType = typeof initialState;

// create one share hooks
const [useCount, countStore] = createOne<CountStateType>(initialState);

export { useCount, countStore };

// selectors @todo: more simple like this: selector('x.xx') x.xx means the key path
export const selectors = {
  selectCount: () => {
    return countStore.getState().count;
  },
};

// actions
export const actions = {
  '+1': () => {
    countStore.setState({ count: selectors.selectCount() + 1 });
  },
  '-1': () => {
    countStore.setState({ count: selectors.selectCount() - 1 });
  },
  'async+1': async (ms: number) => {
    /* @todo need to clearTimeout */
    setTimeout(() => {
      countStore.setState({ count: selectors.selectCount() + 1 });
    }, ms);
  },
};

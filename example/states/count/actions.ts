import { countStore, countInitialState } from './useCount';
import { countSelectors } from './selectors';

export const countActions = {
  reset() {
    countStore.replaceState(countInitialState);
  },
  '+1': () => {
    countStore.replaceState(countSelectors.getCount() + 1);
  },
  '-1': () => {
    countStore.replaceState(countSelectors.getCount() + 1);
  },
  'async+1': async (ms: number) => {
    /* @todo need to clearTimeout */
    setTimeout(() => {
      countStore.replaceState(countSelectors.getCount() + 1);
    }, ms);
  },
};

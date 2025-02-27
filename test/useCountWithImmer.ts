// count-store.ts
import { create } from '../src';
import { produce } from 'immer';

const initialState = { count: 0 };
const [use, store] = create(initialState);

const computed = {
  get state() {
    return store.getState();
  },
};

const actions = {
  produce(cb: (state: typeof initialState) => void) {
    store.setState(produce(cb));
  },
  increment() {
    this.produce((state) => {
      state.count++;
    });
  },
  decrement() {
    this.produce((state) => {
      state.count--;
    });
  },
};

export const useCount = use;
export const countStore = Object.assign(
  {
    ...computed,
    ...actions,
    use,
  },
  store
);

import { create } from '../src';
import { produce } from 'immer';

const initialState = { count: 0 };

// type CountStateType = typeof initialState;
// const [useCount, countStore] = create<CountStateType>(initialState);
const [useHook, store] = create(initialState);

export const countStore = store;
export const useCount = useHook;

export function produceState(cb: (state: typeof initialState) => void) {
  store.setState(produce(cb));
}

export const actions = {
  produceState,
  increment: () => {
    produceState((state) => {
      state.count++;
    });
  },
  decrement: () => {
    produceState((state) => {
      state.count--;
    });
  },
};

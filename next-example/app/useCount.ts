import { create } from 'use-one';

const initialState = { count: 0 };

const [useCount, countStore] = create(initialState);

export { useCount, countStore };

export const actions = {
  increment: () => {
    countStore.setState({ count: countStore.getState().count + 1 });
  },
  decrement: () => {
    countStore.setState({ count: countStore.getState().count - 1 });
  },
};

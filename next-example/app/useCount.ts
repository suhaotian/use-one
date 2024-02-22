import { create } from 'use-one';
import { updateCount } from './api';

const initialState = { count: 0 };

const [useCount, countStore] = create(initialState);

export { useCount, countStore };

export const actions = {
  increment: async () => {
    const count = countStore.getState().count + 1;
    countStore.setState({ count });
    await updateCount(count);
  },
  decrement: async () => {
    const count = countStore.getState().count - 1;
    countStore.setState({ count });
    await updateCount(count);
  },
};

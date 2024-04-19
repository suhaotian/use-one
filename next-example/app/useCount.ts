import { create } from 'use-one';
import { persistStore, wrapState, isClient } from 'use-one/persist';
import { updateCount } from './api';

const initialState = wrapState({ count: 0 });
const [use, store] = create(initialState);

console.log('isClient', isClient);
isClient && persistStore(store, { key: '@COUNTER' });

const actions = {
  increment: async () => {
    const count = store.getState().count + 1;
    store.setState((state) => ({ ...state, count }));
    await updateCount(count);
  },
  decrement: async () => {
    const count = store.getState().count - 1;
    store.setState((state) => ({ ...state, count }));
    await updateCount(count);
  },
};

export const countStore = Object.assign(actions, { use }, store);

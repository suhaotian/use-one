import { create, type StrictPropertyCheck } from 'use-one';

const initialState = { count: 0 };
const [use, store] = create(initialState);

const _actions = {
  get state() {
    return store.getState();
  },
  increment() {
    store.setState({ count: this.state.count + 1 });
  },
  decrement() {
    store.setState({ count: this.state.count - 1 });
  },
  // setState: 1 // If you uncomment this line, the code below will throw an error.
};
const actions: StrictPropertyCheck<typeof _actions> = _actions;

export const useAdvancedType = use;
export const advancedTypeStore = Object.assign(actions, store);

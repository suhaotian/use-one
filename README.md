[![Test and Release](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml/badge.svg)](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml)
[![npm version](https://badgen.net/npm/v/use-one?color=green)](https://www.npmjs.com/package/use-one)
[![install size](https://packagephobia.com/badge?p=use-one@latest)](https://packagephobia.com/result?p=use-one@latest)
![license](https://badgen.net/npm/license/use-one?color=green)
[![author](https://badgen.net/badge/icon/Made%20by%20suhaotian?icon=github&label&color=black&labelColor=black)](https://github.com/suhaotian)

# use-one

[`use-one`](/) is a HOH(higher-order hook) for share state between components in react app.

**Features**

- Easy share state anywhere
- No more complex concepts, only useHook
- Write in TypeScript
- Tiny size (with Dependencies together only gzip 2KB!)
- Boilerplate Code Generator support [use-one-templates](https://github.com/suhaotian/use-one-templates)

## Install

**npm**

```bash
npm install use-one  --save
```

**pnpm**

```bash
pnpm install use-one
```

## Usage

**Create one hook**

```ts
// stores/count.ts
import { create } from 'use-one';

const initialState = { count: 0 };
const [use, store] = create(initialState);

const actions = {
  get state() {
    return store.getState();
  },
  increment() {
    store.setState({ count: this.state.count + 1 });
  },
  decrement() {
    store.setState({ count: this.state.count - 1 });
  },
};

export const countStore = Object.assign(
  {
    ...actions,
    use,
  },
  store
);
```

**Use the hook**

```tsx
// CountExample.tsx
import * as React from 'react';
import { countStore } from './stores/count';

const Counter = () => {
  countStore.use();
  const { count } = countStore.state;

  return (
    <div>
      <button onClick={countStore.increment}>+1</button>
      <span>{count}</span>
      <button onClick={countStore.decrement}>-1</button>
      <button
        onClick={() => {
          setTimeout(() => {
            countStore.setState({
              count: countStore.state.count + 2,
            });
          }, 2000);
        }}
      >
        async +2
      </button>
    </div>
  );
};

const ShowCountInOtherPlace = () => {
  const [state] = countStore.use();
  return <span>Count: {state.count}</span>;
};

export default function App() {
  return (
    <React.Fragment>
      <ShowCount />
      <Counter />
    </React.Fragment>
  );
}
```

### Use with immer

We can wrap a new function that call `produceState` with immer's `produce`, for example:

```ts
export function produceState(cb: (state: typeof initialState) => void) {
  countStore.setState(produce(cb));
}
```

Full code:

```ts
// count-store.ts
import { create } from 'use-one';
import { produce } from 'immer';

const initialState = { count: 0 };
const [use, store] = create(initialState);

const computed = {
  get state() {
    return store.getState();
  },
};

const actions = {
  produceState(cb: (state: typeof initialState) => void) {
    store.setState(produce(cb));
  },
  increment() {
    this.produceState((state) => {
      state.count++;
    });
  },
  decrement() {
    this.produceState((state) => {
      state.count--;
    });
  },
};

export const countStore = Object.assign(
  {
    ...computed,
    ...actions,
    use,
  },
  store
);
```

### Persist store

> If you are using React-Native or Expo, Need install `@react-native-async-storage/async-storage`

```ts
import { create, persistStore, wrapState, isClient } from 'use-one';

const initialState = wrapState({ count: 0 }); // -> { ready: false, count: 0 }
const [use, store] = create(initialState);

console.log('isClient', isClient);
isClient &&
  persistStore(store, {
    key: '@CACHE_KEY',
    debounce: 100, // optional, default 100ms
    transform: (state) => state, // optional
  });

const actions = {
  get state() {
    return store.getState();
  },
  increment() {
    store.setState({ count: this.state.count + 1 });
  },
  decrement() {
    store.setState({ count: this.state.count - 1 });
  },
};
export const countStore = Object.assign(
  {
    ...actions,
    use,
  },
  store
);
```

### Examples

[Examples Source Code](https://github.com/suhaotian/use-one/tree/master/example)

## API

- `create` - e.g: `create<Type>(initialState, Options?: {useEffect?: boolean, name?: string})`
  if the options useEffect is false, will use useLayoutEffect
  - returns `[useHook, store]`
    - `store` methods:
      - `.getState()` get the state
      - `.setState(newState)` set the state
      - `.forceUpdate()` force update
      - `.subscribe(cb: (state) => {})` subscribe `.setState` update, return unsubscribe function
      - `.syncState(newState)` sync state without update
      - `.destroy` clear event

### Dependencies

- [eventemitter3](https://github.com/primus/eventemitter3)

### Boilerplate Code Generator

Check [use-one-templates](https://github.com/suhaotian/use-one-templates), it's very useful to create many share states in large application.

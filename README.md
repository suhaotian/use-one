# use-one: A simple state management lib for React.js.

[![Test and Release](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml/badge.svg)](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml)
[![npm version](https://badgen.net/npm/v/use-one?color=green)](https://www.npmjs.com/package/use-one)
[![Size](https://deno.bundlejs.com/badge?q=xior@1.5.0&badge=detailed)](https://bundlejs.com/?q=use-one%401.5.0)
[![install size](https://packagephobia.com/badge?p=use-one@latest)](https://packagephobia.com/result?p=use-one@latest)
![license](https://badgen.net/npm/license/use-one?color=green)

# Intro

[`use-one.js`](/) is a simple state management lib for React.js.

**Features**

- No more complex concepts, only hooks
- Easy share state anywhere
- Easy persist store or your hooks state
- Tiny size (gzip ~2KB)
- Write in TypeScript, Typesafe

# Table of Contents

- [use-one: A simple state management lib for React.js.](#use-one-a-simple-state-management-lib-for-reactjs)
- [Intro](#intro)
- [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
    - [Simple Demo](#simple-demo)
    - [Using immer](#using-immer)
    - [Persist store](#persist-store)
    - [Persist store in SSR application](#persist-store-in-ssr-application)
    - [Persist any hooks state](#persist-any-hooks-state)
  - [API](#api)
  - [Boilerplate Code Generator](#boilerplate-code-generator)

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

### Simple Demo

```ts
// stores/count.ts
import { create, EventBus, eventBus } from 'use-one';

const initialState = { count: 0 };
const [use, store] = create(initialState);

const actions = {
  use,
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

export const countStore = Object.assign(actions, store);
```

**Use the hook**

```tsx
// CountExample.tsx
import * as React from 'react';
import { countStore } from './stores/count';

const Counter = () => {
  const [state] = countStore.use();
  const { count } = state;
  // const { count } = countStore.state;

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

### Using immer

We can wrap a new function that call `produceState` with immer's `produce`, for example:

```ts
export function produceState(cb: (state: typeof initialState) => void) {
  countStore.setState(produce(cb));
}
```

Full code:

```ts
// stores/count.ts
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
  use,
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

export const countStore = Object.assign(actions, computed, store);
```

### Persist store

> If you are using React-Native or Expo, Need install `@react-native-async-storage/async-storage`

```ts
import { create, persistStore, wrapState, isClient } from 'use-one';

const initialState = wrapState({ count: 0 }); // -> { ready: false, count: 0 }
const [use, store] = create(initialState);

console.log('isClient', isClient);
isClient &&
  persistStore<typeof initialState>(store, {
    key: '@CACHE_KEY',
    debounce: 100, // optional, default 100ms
    transform: (state) => state, // optional, transform the state before to `setState`
  });

const actions = {
  use,
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
export const countStore = Object.assign(actions, store);
```

### Persist store in SSR application

To prevent hydration error in SSR application(like Next.js, Remix..etc.), we can do this:

- 1. Use `onPersistReady` to subscribe ready event to persist:

```ts
import {
  create,
  persistStore,
  wrapState,
  isClient,
  onPersistReady,
} from 'use-one';

const initialState = wrapState({ count: 0 }); // -> { ready: false, count: 0 }
const [use, store] = create(initialState);

onPersistReady(() => {
  persistStore<typeof initialState>(store, {
    key: '@CACHE_KEY',
    debounce: 100, // optional, default 100ms
    transform: (state) => state, // optional, transform the state before to `setState`
  });
});

const actions = {
  use,
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
export const countStore = Object.assign(actions, store);
```

- 2. Add `PersistProvider` to your components to emit ready event:

```tsx
import { Provider as PersistProvider } from 'use-one';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersistProvider>{children}</PersistProvider>;
}
```

### Persist any hooks state

> This is a helper function, no relation with store.

You persist any hooks state. For example, let's persist **useState**:

> If you are using React-Native or Expo, Need install `@react-native-async-storage/async-storage`

```tsx
import { useState } from 'react';
import { usePersist } from 'use-one';

export function Counter() {
  const [count, setCount] = useState(0);
  const [isReady, clean] = usePersist<typeof count>({
    key: '@count-store-key',
    getState: () => count,
    setState: setCount,
    // setState: (state) => setCount(state),
  });
  if (!isReady) return <div>Loading</div>;

  return (
    <div>
      <h1>{count}</h1>
      <br />
      <button onClick={() => setCount(count + 1)}>+1</button>
      <br />
      <button onClick={() => setCount(count - 1)}>-1</button>
      <br />
      <button onClick={clean}>Clean Cache</button>
    </div>
  );
}
```

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

## Boilerplate Code Generator

Check [use-one-templates](https://github.com/suhaotian/use-one-templates), it's very useful to create many share states in large application.

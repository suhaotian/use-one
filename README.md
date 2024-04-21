[![Test and Release](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml/badge.svg)](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml)
[![npm version](https://badgen.net/npm/v/use-one?color=green)](https://www.npmjs.com/package/use-one)
[![install size](https://packagephobia.com/badge?p=use-one@latest)](https://packagephobia.com/result?p=use-one@latest)
![license](https://badgen.net/npm/license/use-one?color=green)
[![author](https://badgen.net/badge/icon/Made%20by%20suhaotian?icon=github&label&color=black&labelColor=black)](https://github.com/suhaotian)

# Intro

[`use-one.js`](/) is a simple state management lib for React.js.

**Features**

- No more complex concepts, only hooks
- Easy share state anywhere
- Tiny size (gzip ~2KB)
- Write in TypeScript, Typesafe

# Table of Contents

- [Intro](#intro)
- [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
    - [Simple Demo](#simple-demo)
    - [Using immer](#using-immer)
    - [Persist store](#persist-store)
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
  persistStore(store, {
    key: '@CACHE_KEY',
    debounce: 100, // optional, default 100ms
    transform: (state) => state, // optional
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

# use-one: A simple state management lib for React.js

[![Test and Release](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml/badge.svg)](https://github.com/suhaotian/use-one/actions/workflows/test-release.yml)
[![npm version](https://badgen.net/npm/v/use-one?color=green)](https://www.npmjs.com/package/use-one)
<a href="https://pkg-size.dev/use-one"><img src="https://pkg-size.dev/badge/install/29671" title="Install size for use-one"></a>
<a href="https://pkg-size.dev/use-one"><img src="https://pkg-size.dev/badge/bundle/3173" title="Bundle size for use-one"></a>
![license](https://badgen.net/npm/license/use-one?color=green)

# Introduction

[`use-one`](/) is a lightweight state management library for React.js.

**Features**

- Simple hook-based API with no complex concepts
- Easy state sharing across components
- Built-in persistence capabilities for stores and hook states
- Minimal size (gzip ~2KB)
- Written in TypeScript with full type safety

# Table of Contents

- [use-one: A simple state management lib for React.js](#use-one-a-simple-state-management-lib-for-reactjs)
- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Using Immer](#using-immer)
    - [Persisting Store State](#persisting-store-state)
    - [Persistence in SSR Applications](#persistence-in-ssr-applications)
    - [Persisting Hook State](#persisting-hook-state)
    - [Advanced TypeScript Usage](#advanced-typescript-usage)
  - [API Reference](#api-reference)
    - [`create<Type>(initialState, options?)`](#createtypeinitialstate-options)
  - [Code Generation](#code-generation)

## Installation

**npm**

```bash
npm install use-one --save
```

**pnpm**

```bash
pnpm install use-one
```

## Usage

### Basic Example

```ts
// stores/count.ts
import { create } from 'use-one';

const initialState = { count: 0 };
export const [use, store] = create(initialState);

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

export const useCount = use;
export const countStore = Object.assign(actions, store);
```

**Using the Store**

```tsx
// CountExample.tsx
import * as React from 'react';
import { useCount, countStore } from './stores/count';

const Counter = () => {
  const [{ count }] = useCount();

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

const ShowCount = () => {
  const [state] = useCount();
  return <span>Count: {state.count}</span>;
};

export default function App() {
  return (
    <>
      <ShowCount />
      <Counter />
    </>
  );
}
```

### Using Immer

Integrate with Immer for immutable state updates:

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
export const countStore = Object.assign(actions, computed, store);
```

### Persisting Store State

For React Native or Expo applications, install `@react-native-async-storage/async-storage` first.

```ts
import { create, persistStore, wrapState, isClient } from 'use-one';

const initialState = wrapState({ count: 0 }); // Adds ready: false
const [use, store] = create(initialState);

if (isClient) {
  persistStore<typeof initialState>(store, {
    key: '@CACHE_KEY',
    debounce: 100, // Optional, defaults to 100ms
    transform: (state) => state, // Optional state transformer
  });
}

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

export const useCount = use;
export const countStore = Object.assign(actions, store);
```

### Persistence in SSR Applications

To prevent hydration errors in SSR applications (Next.js, Remix, etc.):

```ts
// store.ts
import { create, persistStore, wrapState, onPersistReady } from 'use-one';

const initialState = wrapState({ count: 0 });
const [use, store] = create(initialState);

onPersistReady(() => {
  persistStore<typeof initialState>(store, {
    key: '@CACHE_KEY',
    debounce: 100,
    transform: (state) => state,
  });
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

export const useCount = use;
export const countStore = Object.assign(actions, store);
```

```tsx
// layout.tsx
import { Provider as PersistProvider } from 'use-one';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PersistProvider>{children}</PersistProvider>;
}
```

### Persisting Hook State

Persist any hook's state independently of stores:

```tsx
import { useState } from 'react';
import { usePersist } from 'use-one';

export function Counter() {
  const [count, setCount] = useState(0);
  const [isReady, clean] = usePersist<typeof count>({
    key: '@count-store-key',
    getState: () => count,
    setState: setCount,
  });

  if (!isReady) return <div>Loading...</div>;

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={clean}>Clear Cache</button>
    </div>
  );
}
```

### Advanced TypeScript Usage

Prevent property conflicts using `StrictPropertyCheck`:

```ts
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
};

const actions: StrictPropertyCheck<typeof _actions> = _actions;

export const useCount = use;
export const countStore = Object.assign(actions, store);
```

## API Reference

### `create<Type>(initialState, options?)`

Creates a new store with the following options:

- `useEffect`: Boolean (default: true) - Uses `useEffect` when true, `useLayoutEffect` when false
- `name`: String - Optional name for the store

Returns `[useHook, store]` where `store` provides:

- `getState()`: Get current state
- `setState(newState)`: Update state
- `forceUpdate()`: Force component updates
- `subscribe(cb: (state) => void)`: Subscribe to state changes
- `syncState(newState)`: Update state without triggering updates
- `destroy()`: Clean up store resources

## Code Generation

Visit [use-one-templates](https://github.com/suhaotian/use-one-templates) for boilerplate code generation tools, especially useful for managing multiple stores in larger applications.

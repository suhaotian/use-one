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
// useCount.ts
import { create } from 'use-one';

const initialState = { count: 0 };

// type CountStateType = typeof initialState;
// const [useCount, countStore] = create<CountStateType>(initialState);
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
```

**Use the hook**

```tsx
// CountExample.tsx
import * as React from 'react';
import { useCount, actions, countStore } from './useCount';

const Counter = () => {
  const [countState, setCountState] = useCount();

  const { count } = countState;

  return (
    <div>
      <button onClick={actions.increment}>+1</button>
      <span>{count}</span>
      <button onClick={actions.decrement}>-1</button>
      <button
        onClick={() => {
          setTimeout(() => {
            setCountState({
              count: countStore.getState().count + 2,
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
  const [countState] = useCount();
  const { count } = countState;

  return <span>Count: {count}</span>;
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

We can use:

```ts
...
export function produceState(cb: (state: typeof initialState) => void) {
  countStore.setState(produce(cb));
}
...
```

full code:

```ts
// useCount.ts
import { create } from 'use-one';
import { produce } from 'immer';

const initialState = { count: 0 };

// type CountStateType = typeof initialState;
// const [useCount, countStore] = create<CountStateType>(initialState);
const [useCount, countStore] = create(initialState);

export { useCount, countStore };

export function produceState(cb: (state: typeof initialState) => void) {
  countStore.setState(produce(cb));
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

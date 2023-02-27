# use-one

[`use-one`](/) is a HOH(higher-order hook) for share state between components in react app.

**Features**

- Easy share state anywhere
- No more complex concepts, only useHook
- Write in TypeScript
- Tiny size (with Dependencies together only gzip 2KB!)

### More Examples

[https://use-one.com/demo.html](https://use-one.com/demo.html)

[More Examples Source Code](https://github.com/suhaotian/use-one/tree/master/example)

## API

- `createOne` - e.g: `createOne<Type>(initialState, Options?: {useEffect?: boolean, name?: string})`
  if the options useEffect is false, will use useLayoutEffect
  - returns `[useHook, store]`
    - `store` methods:
      - `.getState()` get the state
      - `.replaceState(newState)` set the state
      - `.forceUpdate()` force update
      - `.subscribe(cb: (state) => {})` subscribe `.replaceState` update, return unsubscribe function
      - `.syncState(newState)` sync state without update, useful for list components update
      - `.destroy` clear event

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
import { createOne } from 'use-one';

const initialState = { count: 0 };

// type CountStateType = typeof initialState;
// const [useCount, countStore] = createOne<CountStateType>(initialState);
const [useCount, countStore] = createOne(initialState);

export { useCount, countStore };

export const actions = {
  increment: () => {
    countStore.replaceState({ count: countStore.getState().count + 1 });
  },
  decrement: () => {
    countStore.replaceState({ count: countStore.getState().count - 1 });
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

### Bugs

TodoList example if we add useTodoList in TodoItem component, and click remove button 4 times, the child component still not remove! (Current solution was dont use `hook` in loop condition)

### Dependencies

- [eventemitter3](https://github.com/primus/eventemitter3)

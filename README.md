# use-one

[`use-one`](https://use-one.com) is a HOH(higher-order hook) for share state between components in react app. https://use-one.com

**Features**

- Easy share state anywhere
- No more complex concepts, only useHook
- Write in TypeScript
- Boilerplate Code Generator support [use-one-templates](https://github.com/suhaotian/use-one-templates)
- Tiny size (with Dependencies together only gzip 2KB!)

**Online Demos (CodeSandbox)**

[Count Demo](https://codesandbox.io/embed/hidden-hooks-i4z28?fontsize=14&hidenavigation=1&theme=dark)

[Text Input Demo](https://codesandbox.io/s/use-one-text-input-demo-fhfph?fontsize=14&hidenavigation=1&theme=dark)

### More Examples

[https://use-one.com/demo.html](https://use-one.com/demo.html)

[More Examples Source Code](https://github.com/suhaotian/use-one/tree/master/example)

## API

- `createOne` - e.g: `createOne<Type>(initialState, Options?: {useEffect?: boolean, name?: string})` // if useEffect false, will use useLayoutEffect
  - returns `[useHook, store]`
    - `store` methods:
      - `.getState()` get the state
      - `.replaceState(newState)` set the state
      - `.subscribe(cb: (state) => {})` subscribe `.replaceState` update, return unsubscribe function
      - `.syncState(newState)` sync state without update, useful for list components update
      - `.destroy` clear event

### Boilerplate Code Generator

Please see [use-one-templates](https://github.com/suhaotian/use-one-templates), it's very useful to create many share states in large application.

## Install

**npm**

```bash
npm install use-one eventemitter3 --save
```

**yarn**

```bash
yarn add use-one eventemitter3
```

**UMD**

CDN

```html
<script src="https://unpkg.com/eventemitter3@4.0.4/umd/eventemitter3.min.js"></script>
<script src="https://unpkg.com/use-one@0.8.2/dist/useone.umd.production.min.js"></script>
```

Browser Namespace: UseOne.createOne

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
import { useCount, actions } from './useCount';

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

### Todos

- [x] unit tests
- [ ] performance benchmark test
- [x] publish to npm
- [ ] ~~vue support~~
- [ ] ~~svelte support~~
- [x] offical website
- [ ] better documention
- [x] more examples
- [x] \[store\].setState replace with .replaceState
- [x] ~~vscode snippet plugin~~ we have [use-one-templates](https://github.com/suhaotian/use-one-templates) now

### Bugs

TodoList example if we add useTodoList in TodoItem component, and click remove button 4 times, the child component still not remove! (Current solution was dont use `hook` in loop condition)

### Dependencies

- [eventemitter3](https://github.com/primus/eventemitter3)

# use-one

[`use-one`](https://use-one.com) is a HOH(higher-order hook) for share state between components in react app.

**Features**

- ease share state
- tiny size

## Install

**npm**

```bash
npm install use-one --save
```

**yarn**

```bash
yarn add use-one
```

**UMD**

jsdeliver

```html
<script src="https://unpkg.com/eventemitter3@4.0.4/umd/eventemitter3.min.js"></script>
<script src="https://unpkg.com/use-one@0.2.0/dist/useone.umd.production.min.js"></script>
```

Browser Namespace: UseOne.createOne

## Usage

**Create one hook**

```ts
// useCount.ts
import { createOne } from 'use-one';

const initialState = { count: 0 };

type CountState = typeof initialState;

const [useCount, countStore] = createOne<CountStateType>(initialState);

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
              count: count + 2,
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
    <Fragment>
      <ShowCount />
      <Counter />
    </Fragment>
  );
}
```

### Todos

- [ ] unit tests
- [ ] performance benchmark test
- [x] publish to npm
- [ ] vue support
- [ ] svelte support
- [ ] offical website and documention
- [ ] more examples

### Dependencies

- [eventemitter3](https://github.com/primus/eventemitter3)

**Features**

- ease share state
- tiny size

## Install

**npm**

```bash
npm install use-one eventemitter3 --save
```

**yarn**

```bash
yarn add use-one eventemitter3
```

## Usage

**Create one hook**

```ts
// useCount.ts
import { createOne } from "use-one";

const initialState = { count: 0 };

type CountStateType = typeof initialState;

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
import * as React from "react";
import { useCount, countStore, actions } from "./useCount";

const CountExample = () => {
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
        }}>
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
      <ShowCountInOtherPlace />
      <CountExample />
    </Fragment>
  );
}
```

### Online Example

<iframe src="https://codesandbox.io/embed/hidden-hooks-i4z28?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hidden-hooks-i4z28"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

#### Dependencies

- [eventemitter3](https://github.com/primus/eventemitter3)


<style>
.project-tagline {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
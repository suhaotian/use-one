**Features**

- Easy share state anywhere
- No more complex concepts, only useHook
- Write in TypeScript
- Boilerplate Code Generator support [use-one-templates](https://github.com/suhaotian/use-one-templates)
- Tiny size (with Dependencies together only gzip 2KB!)

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

// export type CountStateType = typeof initialState;
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

## API

- `createOne` - e.g: `createOne<Type>(initialState)`
  - returns `[useHook, store]`
    - `store` methods:
      - `.getState()` get the state
      - `.replaceState(newState)` set the state
      - `.subscribe(cb: (state) => {})` subscribe `.replaceState` update, return unsubscribe function
      - `.syncState(newState)` sync state without update, useful for list components update

## Boilerplate Code Generator

Please see [use-one-templates](https://github.com/suhaotian/use-one-templates), it's very useful to create many share states in large application.

### Online Example

**Count**

<iframe src="https://codesandbox.io/embed/hidden-hooks-i4z28?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hidden-hooks-i4z28"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   
**TextInput**
<iframe src="https://codesandbox.io/embed/use-one-text-input-demo-fhfph?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="use-one-text-input-demo"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### More Examples

[https://use-one.com/demo.html](https://use-one.com/demo.html)

[More Examples Source Code](https://github.com/suhaotian/use-one/tree/master/example)

#### Dependencies

- [eventemitter3](https://github.com/primus/eventemitter3)

<style>
.project-tagline {
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-97994030-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-97994030-4');
</script>

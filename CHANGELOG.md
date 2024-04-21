# CHANGELOG

### 1.4.0-beta.1

- Fix: `persistStore` wronge when cahce data is null


### 1.4.0-beta.0

- Feat: `persistStore` support React Native / Expo

---

Usage:

```ts
import { create, persistStore, wrapState, isClient } from 'use-one';

const initialState = wrapState({ count: 0 }); // -> { ready: false, count: 0 }
const [use, store] = create(initialState);

console.log('isClient', isClient);
isClient && persistStore(store, { key: '@CACHE_KEY', debounce: 100 });
```

### 1.3.0-beta.0

- Feat: add persist store, support react-native and web

---

Usage:

```ts
import { create } from 'use-one';
import { persistStore, wrapState, isClient } from 'use-one/persist';

const initialState = wrapState({ count: 0 }); // -> { ready: false, count: 0 }
const [use, store] = create(initialState);

console.log('isClient', isClient);
isClient && persistStore(store, { key: '@CACHE_KEY', debounce: 100 });
```

### 1.2.0-beta.0

- Feat: support server components (Inspired from https://www.npmjs.com/package/server-only?activeTab=code)

### 1.1.0

- Depretated `.replaceState`, use `.setState` instead

### 1.0.0

- Depretated `createOne`, use `create` instead

### 1.0.0-beta.4

- add test, e2e tests

### 1.0.0-beta.3

- `export type createOptions` => `export type CreateOptions`
- add back `createOne` but deprecated

### 1.0.0-beta.2

- Clean types again
- `syncState` and `replaceState` support `oldState => newState`
- Breaking Change: `createOne` change to `create`

### 1.0.0-beta.1

- Clean types
- Use `pnpm` for install instead `yarn`

### 1.0.0-beta.0

- Use `event-emitter` as deps, no need addtional install
- Change build: replace `tsdx` with `bunchee`
- Bump example depencies

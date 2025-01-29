# CHANGELOG

### 1.5.1

- Add `peerDependenciesMeta` to package.json

### 1.5.0

- Fix: build size

### 1.4.2

- Feat: add `use client` to `Provider.tsx` component
- Chore(README): Add SSR application persist storage chapter

### 1.4.1

- Feat: export `emitPersistReady` and `onPersistReady` utils

### 1.4.0

🥳 Beta finally end, publish v1.4.0

New features compare to v1.1.1:

- Feat: Add `persistStore` to persist your store
- Feat: Add `usePersist` to persist react hook's state
- Chore(README): README reorganize and code reorganize

### 1.4.0-beta.4

- Fix: `isReady` always false after clean

### 1.4.0-beta.3

- Feat: add `usePersist` hook to persist any hooks's state

### 1.4.0-beta.2

- Refactor: remove `eventemitter3` deps. Thanks @arkatsy ❤️

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

import { getPersistStore, debounce } from './get-persist';
import { createPersist as createStatePersist } from './create-persist';
import webCache from './web-cache';

export * from './provider';

export const isClient = typeof document !== 'undefined';

const { wrapState, persistStore } = getPersistStore(webCache, isClient);
export { debounce, wrapState, persistStore };

export const usePersist = createStatePersist({
  cache: webCache,
  debounce: 100,
});

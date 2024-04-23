import { getPersistStore, debounce } from './get-persist';
import RNCache from './rn-cache';
import { createPersist as createStatePersist } from './create-persist';

export * from './provider';

export const isClient = true;
const { wrapState, persistStore } = getPersistStore(RNCache, isClient);
export { debounce, wrapState, persistStore };

export const usePersist = createStatePersist({ cache: RNCache, debounce: 100 });

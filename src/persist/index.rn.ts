import { getPersistStore, debounce } from './get-persist';
import RNCache from './rn-cache';
import { createPersist as createStatePersist } from './create-persist';
import { Provider } from './provider';

export const isClient = true;
const { wrapState, persistStore } = getPersistStore(RNCache, isClient);
export { debounce, wrapState, persistStore, Provider };

export const usePersist = createStatePersist({ cache: RNCache, debounce: 100 });

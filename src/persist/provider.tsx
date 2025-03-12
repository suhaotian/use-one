import { useEffect } from "react";
import { emitPersistReady, onPersistReady } from "./get-persist";

export {
  emitPersistReady,
  onPersistReady
}
export function Provider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    emitPersistReady();
  }, []);
  return children;
}
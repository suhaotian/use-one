'use client';

import { useEffect } from "react";
import { emitPermistReady, onPersistReady } from "./get-persist";

export {
  emitPermistReady,
  onPersistReady
}
export function Provider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    emitPermistReady();
  }, []);
  return children;
}
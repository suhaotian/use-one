import { useEffect } from "react";
import { emitSyncStore } from "./get-persist";

export function Provider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    emitSyncStore();
  }, []);
  return children;
}
'use client';
import { useRef } from "react";
import { countStore } from './useCount';

export default function Provider({ children, count }: { count: number; children: React.ReactNode }) {
  const ref = useRef(false);
  if (!ref.current) {
    countStore.syncState({ count });
    ref.current = true;
  }
  return children
}
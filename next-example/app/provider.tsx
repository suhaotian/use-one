'use client';

import { countStore } from './useCount';

export default function Provider({ children, count }: { count: number; children: React.ReactNode }) {
  countStore.syncState({ count });
  return children
}
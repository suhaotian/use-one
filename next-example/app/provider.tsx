'use client';

import { countStore } from './useCount';

export default function Provider({ children, count }: { count: { count: number }; children: React.ReactNode }) {
  countStore.syncState(state => ({ ...state, ...count }));

  return children
}
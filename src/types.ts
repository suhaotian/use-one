export type ReadonlyNonBasicType<T> = T extends object ? Readonly<T> : T;

export type OptionsType = {
  /** useEffect or useLayoutEffect */
  useEffect: boolean;
  /** state name */
  name?: string;
};

export type CBType<T> = (newValue: ReadonlyNonBasicType<T>) => void;

export type StoreType<T> = {
  getState: () => ReadonlyNonBasicType<T>;
  setState: CBType<T>;
  replaceState: CBType<T>;
  subscribe: (cb: (state: ReadonlyNonBasicType<T>) => void) => () => void;
  /** sync state without emit update */
  syncState: CBType<T>;
  /** emit update */
  forceUpdate: () => void;
  /** Get how many times we update */
  getUpdateCount: () => number;
  /** emit update */
  destroy: () => void;
};

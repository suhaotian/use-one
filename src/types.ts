export type ReadonlyNonBasic<T> = T extends object ? Readonly<T> : T;

/** the create one options */
export type CreateOneOptions = {
  /** useEffect or useLayoutEffect */
  useEffect: boolean;
  /** state name */
  name?: string;
};

/** unsubscribe function */
export type UnsubscribeFunction = () => void;

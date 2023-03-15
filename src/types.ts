export type ReadonlyNonBasic<T> = T extends object ? Readonly<T> : T;

/** the create one options */
export type createOptions = {
  /** useEffect or useLayoutEffect */
  useEffect: boolean;
  /** state name */
  name?: string;
};

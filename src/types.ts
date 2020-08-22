export type ReadonlyNonBasicType<T> = T extends number | string | boolean
  ? T
  : Readonly<T>;

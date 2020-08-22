export type ReadonlyNonBasicType<T> = T extends object ? Readonly<T> : T;

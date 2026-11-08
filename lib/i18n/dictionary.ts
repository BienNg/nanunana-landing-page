import type { Locale } from "./locale";

/** True for `"a" | "b"`, false for a single string literal or a wide `string`. */
type IsUnion<T, U = T> = T extends unknown ? ([U] extends [T] ? false : true) : false;

/**
 * German copy may use different words. Single string literals widen; unions
 * such as ids and form values stay exact; `status` stays a discriminant.
 */
type Widen<T> = T extends string
  ? string extends T
    ? T
    : IsUnion<T> extends true
      ? T
      : string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { [K in keyof T]: K extends "status" ? T[K] : Widen<T[K]> }
          : T;

/** Both languages share one shape. A missing German field fails typecheck. */
export function dictionary<T>(vi: T, de: Widen<T>): Record<Locale, T> {
  return { vi, de: de as T };
}

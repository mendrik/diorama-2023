/* eslint-disable @typescript-eslint/no-explicit-any */
import { NonEmptyArray } from './../types.d'
import 'ramda'

declare module 'ramda' {
  export function head<T>(arr: NonEmptyArray<T>): T
  export function last<T>(arr: NonEmptyArray<T>): T
  export function propEq<T extends Record<string, unknown>, K extends keyof T>(
    name: K,
    value: T[K]
  ): <O extends T>(obj: O) => obj is Extract<O, Record<K, T[K]>>
  export function cond<T extends any[], R>(
    pairs: ReadonlyArray<CondPair<T, R>>
  ): <T2 extends T>(...args: T2) => R
  export function unless<T, U>(
    pred: typeof isNil,
    whenFalseFn: (a: NonNullable<T>) => U,
    a: T
  ): T | U
}

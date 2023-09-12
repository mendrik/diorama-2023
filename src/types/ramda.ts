/* eslint-disable @typescript-eslint/no-explicit-any */
import type {CondPair, Ord} from 'ramda'
import {isNil} from 'ramda'
import type {NonEmptyArray} from './types'

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
  export function sortBy<T>(fn: (a: T) => Ord, list: NonEmptyArray<T>): NonEmptyArray<T>
}

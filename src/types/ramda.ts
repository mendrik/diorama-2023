import type { NonEmptyArray } from './types'
import 'ramda'

type isNil = (value: any) => value is null | undefined
type CondPair<T extends any[], R> = [(...val: T) => boolean, (...val: T) => R]

declare module 'ramda' {
  export function head<T>(arr: NonEmptyArray<T>): T
  export function last<T>(arr: NonEmptyArray<T>): T
  export function cond<T extends any[], R>(
    pairs: ReadonlyArray<CondPair<T, R>>
  ): <T2 extends T>(...args: T2) => R
  export function unless<T, U>(pred: isNil, whenFalseFn: (a: NonNullable<T>) => U, a: T): T | U
  export function sortBy<T>(fn: (a: T) => number, list: NonEmptyArray<T>): NonEmptyArray<T>
}

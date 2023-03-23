import { NonEmptyArray } from './../types.d'
import 'ramda'

declare module 'ramda' {
  export function head<T>(arr: NonEmptyArray<T>): T
  export function propEq<T extends Record<string, unknown>, K = keyof T>(
    name: K,
    value: T[K]
  ): (obj: T) => T is Extract<T, Record<K, T[K]>>
}

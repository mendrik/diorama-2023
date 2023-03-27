import { converge, divide, sum, length } from 'ramda'

type NumFn<T> = (arg: number[]) => T

export const average: (arr: number[]) => number = converge<number, [NumFn<number>, NumFn<number>]>(
  divide,
  [sum, length]
)

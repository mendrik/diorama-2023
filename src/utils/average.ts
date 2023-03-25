import { converge, divide, sum, length } from 'ramda'
import type { AnyFunction } from 'ramda'

export const average: (arr: number[]) => number = converge(divide as AnyFunction, [sum, length])

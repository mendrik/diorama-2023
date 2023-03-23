import { NonEmptyArray } from '../types'

export const isNotEmpty = <T>(arr: T[]): arr is NonEmptyArray<T> => arr.length > 0

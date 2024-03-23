import type { Milliseconds } from './types/types'
import { range } from 'ramda'

export const images = range(1, 18).map(n => `./images/${n}.jpg`)
export const maxComputationTime = 400 as Milliseconds
export const sizeHomogeneity = .5 // the higher the value, the more pictures will approach the same size
export const randomizeThreshold = 8 // if amount of pics is bigger we have too many permutations to iterate through, switch to random strategy
export const iconSize = 20
export const initialImageAmount = 8

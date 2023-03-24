import { Milliseconds } from './types.d'
import { range } from 'ramda'

export const images = range(1, 14).map(n => `./images/${n}.jpg`)
export const maxComputationTime: Milliseconds = 500 as Milliseconds
export const sizeHomogenity = 5
export const aspectRatioThreshold = 3

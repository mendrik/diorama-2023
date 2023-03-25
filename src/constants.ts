import { Milliseconds } from './types.d'
import { range } from 'ramda'

export const images = range(1, 13).map(n => `./images/${n}.jpg`)
export const maxComputationTime: Milliseconds = 300 as Milliseconds
export const sizeHomogenity = 20
export const aspectRatioThreshold = 0.98

import { Milliseconds } from './types.d'
import { range } from 'ramda'

export const images = range(1, 13).map(n => `./images/${n}.jpg`)
export const maxComputationTime: Milliseconds = 700 as Milliseconds
export const sizeHomogenity = 20
export const aspectRatioThreshold = 2

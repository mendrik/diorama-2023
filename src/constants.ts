import type { Milliseconds } from './types/types'
import { range } from 'ramda'

export const images = range(1, 18).map(n => `./images/${n}.jpg`)
export const maxComputationTime = 600 as Milliseconds
export const sizeHomogeneity = .8 // the higher the value, the more pictures will approach the same size
export const iconSize = 20
export const initialImageAmount = 8

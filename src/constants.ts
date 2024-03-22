import type { Milliseconds, Pixels } from './types/types'
import { range } from 'ramda'

export const images = range(1, 18).map(n => `./images/${n}.jpg`)
export const maxComputationTime = 600 as Milliseconds
export const sizeHomogeneity = 10000 // the higher the value, the more pictures will approach the same size
export const aspectRatioThreshold = 0.98 // minimum requirement for aspect ratio match 0-1
export const iconSize = 20
export const minImages = 4
export const initialImageAmount = 8
export const captionHeight = 40 as Pixels

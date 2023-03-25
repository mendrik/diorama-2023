import { Milliseconds } from './types.d'
import { range } from 'ramda'

export const images = range(1, 14).map(n => `./images/${n}.jpg`)
export const maxComputationTime: Milliseconds = 300 as Milliseconds
export const sizeHomogenity = 10000 // the higher the value, the more pictures will approach the same size
export const aspectRatioThreshold = 0.987 // minimum requirement for aspect ratio match 0-1
export const iconSize = 20
export const minImages = 5
export const initialImageAmount = 8

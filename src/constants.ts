import { range } from 'ramda'

export const images = range(1, 14).map(n => `./images/${n}.jpg`)

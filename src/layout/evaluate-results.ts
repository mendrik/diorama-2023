import { sizeHomogenity } from './../constants'
import { sortBy } from 'ramda'
import type { Ord } from 'ramda'
import { NonEmptyArray, Solution } from '../types'

const aspectRatioAndSize =
  (maxAr: number, maxSz: number) =>
  (p: Solution): Ord => {
    const ar = p.aspectRatioDelta / maxAr
    const sz = p.sizeHomogeneity / maxSz

    const score = ar + sz * sizeHomogenity
    return score
  }

export const findBestResult = (results: NonEmptyArray<Solution>): Solution => {
  const maxAr = Math.max(...results.map(s => s.aspectRatioDelta))
  const maxSz = Math.max(...results.map(s => s.sizeHomogeneity))
  const rated = sortBy(aspectRatioAndSize(maxAr, maxSz), results) as NonEmptyArray<Solution>
  const winner = rated[0]
  return winner
}

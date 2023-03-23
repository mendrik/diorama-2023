import { Maybe } from 'purify-ts'
import type { Dimension, Milliseconds, Picture, PositionedPictures } from '../types'
import { findBestResult } from './evaluate-results'
import { layoutSolution } from './layout-solution'
import { mergeCompositions } from './merge-compositions'

export const layoutImages = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
): Promise<PositionedPictures> => {
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height
  return new Promise<PositionedPictures>((resolve, reject) => {
    const results: PositionedPictures[] = []

    while (Date.now() - start < maxComputationTime) {
      const root = mergeCompositions(pictures)
      const arDifference = Math.abs(arTarget - root.aspectRatio)
      const arBest = results[0]?.aspectRatio ?? Number.MAX_SAFE_INTEGER
      if (arDifference < arBest) {
        const finalLayout = layoutSolution(targetDimension, arDifference, root)
        results.unshift(finalLayout)
      }
    }

    const best = findBestResult(results)
    console.log(best)

    Maybe.fromNullable(best)
      .map(resolve)
      .orDefaultLazy(() => reject('no solution found'))
  })
}

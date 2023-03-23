import { findBestResult } from './evaluate-results'
import { Maybe } from 'purify-ts'
import { head } from 'ramda'
import type { Dimension, Milliseconds, Picture, PositionedPictures } from '../types'
import { layoutSolution } from './layout-solution'
import { mergeCompositions } from './merge-compositions'

export const layoutImages = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
): Promise<PositionedPictures> => {
  const start = Date.now()
  const targetAspectRatio = targetDimension.width / targetDimension.height
  return new Promise<PositionedPictures>((resolve, reject) => {
    const results: PositionedPictures[] = []

    while (Date.now() - start < maxComputationTime) {
      const rootComposition = mergeCompositions(pictures)
      const arDifference = Math.abs(targetAspectRatio - rootComposition.aspectRatio)
      const arBest = results[0]?.aspectRatio ?? Number.MAX_SAFE_INTEGER
      if (arDifference < arBest) {
        const finalLayout = layoutSolution(targetDimension, arDifference, rootComposition)
        console.log(rootComposition)

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

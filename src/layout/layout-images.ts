import type { Dimension, Milliseconds, Picture } from '../types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { PositionedPictures } from './../types.d'
import { findBestResult } from './evaluate-results'
import { layoutSolution } from './layout-solution'
import { toRandomTree } from './to-random-tree'

export const layoutImages = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
): Promise<PositionedPictures> => {
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height
  return new Promise<PositionedPictures>((resolve, reject) => {
    const results: PositionedPictures[] = []

    // eslint-disable-next-line functional/no-loop-statements
    while (Date.now() - start < maxComputationTime) {
      const root = toRandomTree(pictures)
      const arDifference = Math.abs(arTarget - root.aspectRatio)
      const arBest = results[0]?.aspectRatioDelta ?? Number.MAX_SAFE_INTEGER
      if (arDifference < arBest * 2) {
        const finalLayout = layoutSolution(targetDimension, arDifference, root)
        // eslint-disable-next-line functional/immutable-data
        results.unshift(finalLayout)
      }
    }
    console.log(results.length)

    if (!isNotEmpty(results)) {
      reject('No solutions')
    } else {
      resolve(findBestResult(results))
    }
  })
}

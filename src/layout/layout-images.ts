import type { Dimension, Milliseconds, Picture } from '../types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { Solution } from './../types.d'
import { findBestResult } from './evaluate-results'
import { layoutSolution } from './layout-solution'
import { toRandomTree } from './to-random-tree'

export const layoutImages = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
): Promise<Solution> => {
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height
  return new Promise<Solution>((resolve, reject) => {
    const results: Solution[] = []

    // eslint-disable-next-line functional/no-loop-statements
    while (Date.now() - start < maxComputationTime) {
      const root = toRandomTree(pictures)
      const arDifference = Math.abs(arTarget - root.aspectRatio)
      const arBest = results[0]?.aspectRatioDelta ?? Number.MAX_SAFE_INTEGER
      if (arDifference < arBest) {
        const finalLayout = layoutSolution(targetDimension, arDifference, root)
        // eslint-disable-next-line functional/immutable-data
        results.unshift(finalLayout)
      }
    }
    if (!isNotEmpty(results)) {
      reject('No solutions')
    } else {
      resolve(findBestResult(results))
    }
  })
}

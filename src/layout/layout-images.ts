import { aspectRatioThreshold } from './../constants'
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
      const arDifference = Math.abs(1 - root.aspectRatio / arTarget)
      const finalLayout = layoutSolution(targetDimension, arDifference, root)
      if (arDifference < aspectRatioThreshold) {
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

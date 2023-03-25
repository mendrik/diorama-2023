import { maxComputationTime, aspectRatioThreshold } from './../constants'

import type { Dimension, Picture } from '../types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { Solution } from '../types'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { toRandomTree } from './to-random-tree'

export const findSolution = async (
  pictures: Picture[],
  targetDimension: Dimension
): Promise<Solution> => {
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height

  return new Promise<Solution>((resolve, reject) => {
    const solutions: Solution[] = []

    // eslint-disable-next-line functional/no-loop-statements
    while (Date.now() - start < maxComputationTime) {
      const root = toRandomTree(pictures)
      const distance = Math.abs(root.aspectRatio - arTarget)
      const score = Math.max(0, 1 - distance / arTarget)

      if (score > aspectRatioThreshold) {
        // discard non-fitting solutions (too much crop)
        const finalLayout = positionSolution(targetDimension, score, root)
        // eslint-disable-next-line functional/immutable-data
        solutions.unshift(finalLayout)
      }
    }
    if (!isNotEmpty(solutions)) {
      reject('No solutions')
    } else {
      console.debug(`got ${solutions.length} candidates`)
      resolve(evaluateSolutions(solutions))
    }
  })
}

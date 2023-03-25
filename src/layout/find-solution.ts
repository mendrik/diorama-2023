import { aspectRatioThreshold } from '../constants'
import type { Dimension, Milliseconds, Picture } from '../types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { Solution } from '../types'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { toRandomTree } from './to-random-tree'

export const findSolution = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
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
        const finalLayout = positionSolution(targetDimension, score, root)
        // eslint-disable-next-line functional/immutable-data
        solutions.unshift(finalLayout)
      }
    }
    if (!isNotEmpty(solutions)) {
      reject('No solutions')
    } else {
      console.log(`got ${solutions.length} candidates`)

      resolve(evaluateSolutions(solutions))
    }
  })
}

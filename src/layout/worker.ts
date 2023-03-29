import type { Config, Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { resizeDimension } from '../utils/resize-dimension'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { toRandomTree } from './to-random-tree'

export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  config: Config
): Solution => {
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height
  const solutions: Solution[] = []

  // search possible solutions for a limited amount of time
  // eslint-disable-next-line functional/no-loop-statements
  while (Date.now() - start < config.maxComputationTime) {
    const root = toRandomTree(pictures)
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = Math.max(0, 1 - distance / arTarget)

    // discard non-fitting solutions (too much crop)
    if (pictures.length <= config.minImages || score > config.aspectRatioThreshold) {
      const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
      const finalLayout = positionSolution(actualDimensions, score, root)
      // eslint-disable-next-line functional/immutable-data
      solutions.unshift(finalLayout)
    }
  }
  if (!isNotEmpty(solutions)) {
    // eslint-disable-next-line functional/no-throw-statements
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions, config)
}

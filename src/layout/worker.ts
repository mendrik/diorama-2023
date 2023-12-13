import { aspectRatioThreshold, maxComputationTime, minImages, sizeHomogeneity } from '../constants'
import type { Config, Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { resizeDimension } from '../utils/resize-dimension'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { toRandomTree } from './to-random-tree'
import {mergeLeft} from 'ramda'

const defaultConfig: Config = {
  aspectRatioThreshold,
  maxComputationTime,
  minImages,
  sizeHomogeneity
}

export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  partialConfig?: Partial<Config>
): Solution => {
  const config = mergeLeft(partialConfig ?? {}, defaultConfig)
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height
  const solutions: Solution[] = []

  // search possible solutions for a limited amount of time
  while (Date.now() - start < config.maxComputationTime) {
    const root = toRandomTree(pictures)
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = Math.max(0, 1 - distance / arTarget)

    // discard non-fitting solutions (too much crop)
    if (pictures.length <= config.minImages || score > config.aspectRatioThreshold) {
      const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
      const finalLayout = positionSolution(actualDimensions, score, root)
      solutions.push(finalLayout)
    }
  }
  if (!isNotEmpty(solutions)) {
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions, config)
}

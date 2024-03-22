import { aspectRatioThreshold, captionHeight, maxComputationTime, sizeHomogeneity } from '../constants'
import type { Config, Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { toRandomTree } from './to-random-tree'
import { mergeLeft } from 'ramda'
import { resizeDimension } from '../utils/resize-dimension'

const defaultConfig: Config = {
  aspectRatioThreshold,
  maxComputationTime,
  sizeHomogeneity,
  captionHeight
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

  while (Date.now() - start < config.maxComputationTime) {
    const root = toRandomTree(pictures)
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = Math.max(0, 1 - distance / arTarget)
    const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
    solutions.push(positionSolution(actualDimensions, score, root))
  }
  if (!isNotEmpty(solutions)) {
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions, config)
}

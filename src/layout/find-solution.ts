import { discardBadRatio, maxComputationTime, randomizeThreshold } from '../constants'
import type { Config, Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { generateTreeCompositions, toRandomTreeGenerator } from './to-random-tree'
import { mergeLeft } from 'ramda'
import { resizeDimension } from '../utils/resize-dimension'

const defaultConfig: Config = {
  maxComputationTime,
  randomizeThreshold
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
  const isFull = pictures.length < config.randomizeThreshold
  const trees = isFull ? generateTreeCompositions(pictures) : toRandomTreeGenerator(pictures)
  const { abs } = Math
  const { now } = Date
  for (const root of trees) {
    const distance = abs(root.aspectRatio - arTarget)
    const score = 1 / (1 + distance)
    if (!isFull && score < discardBadRatio) {
      continue
    }
    const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
    solutions.push(positionSolution(actualDimensions, score, root))
    if (now() - start > config.maxComputationTime) {
      break
    }
  }
  console.debug('solutions found: ', solutions.length)
  if (!isNotEmpty(solutions)) {
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions)
}

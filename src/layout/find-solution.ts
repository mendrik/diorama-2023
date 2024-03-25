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
  const runForEver = pictures.length >= config.randomizeThreshold
  const trees = runForEver ? toRandomTreeGenerator(pictures) : generateTreeCompositions(pictures)
  for (const root of trees) {
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = 1 / (1 + distance)
    if (runForEver && score < discardBadRatio) {
      continue
    }
    const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
    solutions.push(positionSolution(actualDimensions, score, root))
    if (runForEver && Date.now() - start > config.maxComputationTime) {
      break
    }
  }
  console.debug('solutions found: ', solutions.length)
  if (!isNotEmpty(solutions)) {
    throw new Error('No solution')
  }
  return evaluateSolutions(config, solutions)
}

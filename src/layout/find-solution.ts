import { discardBadRatio, maxComputationTime, randomizeThreshold } from '../constants'
import type { Config, Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { evaluateSolutions } from './evaluate-solutions'
import { sizeSolution } from './size-solution'
import { generateTreeCompositions, toRandomTreeGenerator } from './tree-generator'
import { mergeLeft } from 'ramda'
import { resizeDimension } from '../utils/resize-dimension'
import { flipCount } from '../utils/flip-count'

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
  const runForever = pictures.length >= config.randomizeThreshold
  const trees = runForever ? toRandomTreeGenerator(pictures) : generateTreeCompositions(pictures)
  for (const root of trees) {
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = 1 / (1 + distance)
    const flips = flipCount(root, pictures.length)
    if (runForever && (flips <= 0.5 || score < discardBadRatio)) {
      continue
    }
    const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
    solutions.push(sizeSolution(actualDimensions, score, flips, root))
    if (runForever && Date.now() - start > config.maxComputationTime) {
      break
    }
  }
  console.debug('solutions found: ', solutions.length)
  if (!isNotEmpty(solutions)) {
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions)
}

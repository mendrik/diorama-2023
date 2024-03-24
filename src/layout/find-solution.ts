import { maxComputationTime, randomizeThreshold } from '../constants'
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
  let cycles = 0
  for (const root of trees) {
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = 1 / (1 + distance)
    cycles++
    if (!isFull && score < 0.9) {
      continue
    }
    const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
    solutions.push(positionSolution(actualDimensions, score, root))
    if (Date.now() - start > config.maxComputationTime) {
      console.debug('computation took too long, aborting')
      break
    }
  }
  console.debug('solution checked: ', cycles)
  console.debug('solutions found: ', solutions.length)
  if (!isNotEmpty(solutions)) {
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions)
}

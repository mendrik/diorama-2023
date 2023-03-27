/// <reference types="vite-plugin-comlink/client" />

import { aspectRatioThreshold, maxComputationTime, minImages } from '../constants'
import type { Dimension, Picture, Solution } from '../types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { resizeDimension } from '../utils/resize-dimension'
import { evaluateSolutions } from './evaluate-solutions'
import { positionSolution } from './position-solution'
import { toRandomTree } from './to-random-tree'

export const findSolution = (pictures: Picture[], targetDimension: Dimension): Solution => {
  const start = Date.now()
  const arTarget = targetDimension.width / targetDimension.height
  const solutions: Solution[] = []

  // eslint-disable-next-line functional/no-loop-statements
  while (Date.now() - start < maxComputationTime) {
    const root = toRandomTree(pictures)
    const distance = Math.abs(root.aspectRatio - arTarget)
    const score = Math.max(0, 1 - distance / arTarget)

    if (pictures.length <= minImages || score > aspectRatioThreshold) {
      const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
      // discard non-fitting solutions (too much crop)
      const finalLayout = positionSolution(actualDimensions, score, root)
      // eslint-disable-next-line functional/immutable-data
      solutions.unshift(finalLayout)
    }
  }
  if (!isNotEmpty(solutions)) {
    // eslint-disable-next-line functional/no-throw-statements
    throw new Error('No solution')
  }
  return evaluateSolutions(solutions)
}

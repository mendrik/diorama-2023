import { expose } from 'comlink'
import {
	discardBadRatio,
	maxComputationTime,
	randomizeThreshold
} from '../constants'
import type { Config, Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { resizeDimension } from '../utils/resize-dimension'
import { treeBalance } from '../utils/tree-balance'
import { evaluateSolutions } from './evaluate-solutions'
import { sizeSolution } from './size-solution'
import {
	generateTreeCompositions,
	toOrderedTreeGenerator
} from './tree-generator'

const defaultConfig: Config = {
	maxComputationTime,
	randomizeThreshold
}

export const findSolution = (
	pictures: Picture[],
	targetDimension: Dimension,
	partialConfig?: Partial<Config>
): Solution => {
	const config = { ...defaultConfig, ...partialConfig }
	const start = Date.now()
	const arTarget = targetDimension.width / targetDimension.height
	const solutions: Solution[] = []
	const runForever = pictures.length >= config.randomizeThreshold
	const trees = runForever
		? toOrderedTreeGenerator(pictures)
		: generateTreeCompositions(pictures)
	for (const root of trees) {
		const distance = Math.abs(root.aspectRatio - arTarget)
		const score = 1 / (1 + distance)
		const balance = treeBalance(root)

		if (
			runForever &&
			((solutions.length > 0 && balance <= 0.4) || score < discardBadRatio)
		) {
			continue
		}
		const actualDimensions = resizeDimension(targetDimension, root.aspectRatio)
		solutions.push(sizeSolution(actualDimensions, score, balance, root))
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

expose({ findSolution })

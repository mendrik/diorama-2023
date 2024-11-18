import type { Config, Dimension, Picture, Solution } from '../types/types'

export const workerInstance = new ComlinkWorker<
	typeof import('./find-solution')
>(new URL('./find-solution', import.meta.url))

export const runWorker = (
	pictures: Picture[],
	targetDimension: Dimension,
	config?: Partial<Config>
): Promise<Solution> =>
	workerInstance.findSolution(pictures, targetDimension, config)

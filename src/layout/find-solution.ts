import type { Config, Dimension, Solution, Picture } from '../types/types'

export const workerInstance = new ComlinkWorker<typeof import('./worker')>(
  new URL('./worker', import.meta.url)
)

export const findSolution = (
  pictures: Picture[],
  targetDimension: Dimension,
  config?: Config
): Promise<Solution> => workerInstance.findSolution(pictures, targetDimension, config)

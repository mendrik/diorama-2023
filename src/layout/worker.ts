import type { Config, Dimension, Solution, Picture } from '../types/types'

export const workerInstance = new ComlinkWorker<typeof import('./find-solution')>(
  new URL('./find-solution', import.meta.url)
)

export const worker = (
  pictures: Picture[],
  targetDimension: Dimension,
  config?: Partial<Config>
): Promise<Solution> => workerInstance.findSolution(pictures, targetDimension, config)


/// <reference types="vite-plugin-comlink/client" />

import type { Dimension, Picture, Solution } from '../types/types'

export const workerInstance = new ComlinkWorker<typeof import('./worker')>(
  new URL('./worker', import.meta.url)
)

export const findSolution = (pictures: Picture[], targetDimension: Dimension): Promise<Solution> =>
  workerInstance.findSolution(pictures, targetDimension)

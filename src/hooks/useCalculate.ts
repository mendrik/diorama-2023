import { useCallback, useEffect } from 'react'
import { Dimension, Picture, Solution } from './../types.d'
import { findSolution } from '../layout/find-solution'
import usePromise, { PromiseState } from './usePromise'

export const useCalculate = (images: Picture[], dimension: Dimension): PromiseState<Solution> => {
  const promise = useCallback(
    () => findSolution(dimension, images),
    [images.length, dimension.width, dimension.height]
  )
  const { execute, ...result } = usePromise(promise)
  useEffect(() => void execute(), [promise])
  return result
}

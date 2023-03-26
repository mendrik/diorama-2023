/* eslint-disable react-hooks/exhaustive-deps */
import { Action, controlContext } from '../ui/controls'
import { startTransition, useContext, useEffect } from 'react'
import { Dimension, Picture, Solution } from '../types'
import { findSolution } from '../layout/find-solution'
import usePromise, { PromiseState } from './use-promise'

const dummy: Solution = {
  aspectRatioDelta: 1,
  dimension: { width: 1, height: 1 },
  sizeHomogeneity: 1,
  pictures: []
}

export const useCalculate = (images: Picture[], dimension: Dimension): PromiseState<Solution> => {
  const { subscribe } = useContext(controlContext)
  const { execute, ...result } = usePromise(() =>
    dimension.width === 0 ? Promise.resolve(dummy) : findSolution(images, dimension)
  )
  useEffect(() => {
    if (result.status === 'done' || result.status === 'initial') {
      startTransition(() => void execute())
      return subscribe(Action.refresh, execute)
    }
  }, [result.status, images.length, dimension.width, dimension.height])
  return result
}

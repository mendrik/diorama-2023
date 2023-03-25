/* eslint-disable react-hooks/exhaustive-deps */
import { Action, controlContext } from './../ui/controls'
import { useContext, useEffect } from 'react'
import { Dimension, Picture, Solution } from './../types.d'
import { findSolution } from '../layout/find-solution'
import usePromise, { PromiseState } from './usePromise'

export const useCalculate = (images: Picture[], dimension: Dimension): PromiseState<Solution> => {
  const { subscribe } = useContext(controlContext)
  const { execute, ...result } = usePromise(() => findSolution(images, dimension))
  useEffect(() => {
    void execute()
    return subscribe(Action.refresh, execute)
  }, [images.length, dimension.width, dimension.height])
  return result
}
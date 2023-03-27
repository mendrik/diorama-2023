import { useAsyncRetry } from 'react-use'
import { Action, controlContext } from '../ui/controls'
import { useContext, useEffect } from 'react'
import { Dimension, Picture, Solution } from '../types'
import { findSolution } from '../layout/find-solution'
import type { AsyncState } from 'react-use/lib/useAsyncFn'

export const useCalculate = (images: Picture[], dimension: Dimension): AsyncState<Solution> => {
  const { subscribe } = useContext(controlContext)
  const { retry, ...status } = useAsyncRetry(() =>
    findSolution(images, dimension).catch(() => undefined)
  )

  useEffect(() => {
    retry()
    const unsub = subscribe(Action.refresh, () => void retry())
    return () => unsub()
  }, [dimension.height, dimension.width, images.length, retry, subscribe])

  return status
}

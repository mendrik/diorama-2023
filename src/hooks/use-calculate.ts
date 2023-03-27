import { useAsync, useEffectOnce } from 'react-use'
import { Action, controlContext } from '../ui/controls'
import { useContext, useState } from 'react'
import type { Dimension, Picture, Solution } from '../types'
import { findSolution } from '../layout/find-solution'
import type { AsyncState } from 'react-use/lib/useAsyncFn'
import { inc } from 'ramda'

export const useCalculate = (images: Picture[], dimension: Dimension): AsyncState<Solution> => {
  const [redraw, forceUpdate] = useState(0)
  const { subscribe } = useContext(controlContext)
  const status = useAsync(
    () => findSolution(images, dimension).catch(() => undefined),
    [images.length, dimension.width, dimension.height, redraw]
  )

  useEffectOnce(() => subscribe(Action.refresh, () => forceUpdate(inc)))

  return status
}

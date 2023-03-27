import { useAsyncFn, useEffectOnce } from 'react-use'
import { Action, controlContext } from '../ui/controls'
import { useContext, useEffect, useState } from 'react'
import type { Dimension, Picture, Solution } from '../types'
import { findSolution } from '../layout/find-solution'
import type { AsyncState } from 'react-use/lib/useAsyncFn'
import { inc } from 'ramda'

export const useCalculate = (images: Picture[], dimension: Dimension): AsyncState<Solution> => {
  const [redraw, forceUpdate] = useState(0)
  const { subscribe } = useContext(controlContext)
  const [status, trigger] = useAsyncFn(
    async () => findSolution(images, dimension),
    [images.length, dimension.width, dimension.height, redraw]
  )

  useEffect(() => {
    if (dimension.width > 0 && dimension.height > 0) {
      trigger()
    }
  }, [trigger, images.length, dimension.width, dimension.height, redraw])

  useEffectOnce(() => subscribe(Action.refresh, () => forceUpdate(inc)))

  return status
}

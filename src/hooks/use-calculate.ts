import { useAsyncFn, useEffectOnce } from 'react-use'
import { Action, controlContext } from '../ui/controls'
import { useContext, useLayoutEffect, useState } from 'react'
import type { Dimension, Picture, Solution } from '../types/types'
import { worker } from '../layout/worker'
import type { AsyncState } from 'react-use/lib/useAsyncFn'
import { inc, not } from 'ramda'

export const useCalculate = (images: Picture[], dimension: Dimension): AsyncState<Solution> => {
  const [redraw, forceUpdate] = useState(0)
  const [preferAspectRatio, setPreferAspectRatio] = useState(false)
  const { subscribe } = useContext(controlContext)
  const [status, trigger] = useAsyncFn(
    async () => worker(images, dimension, { preferAspectRatio }),
    [images.length, dimension.width, dimension.height, redraw]
  )

  useLayoutEffect(() => {
    if (dimension.width > 0 && dimension.height > 0) {
      trigger()
    }
  }, [trigger, images.length, dimension.width, dimension.height, redraw])

  useEffectOnce(() => {
    subscribe(Action.refresh, () => forceUpdate(inc))
    subscribe(Action.switchMode, () => {
      setPreferAspectRatio(not)
      forceUpdate(inc)
    })
  })

  return status
}

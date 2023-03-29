import { useAsyncFn, useEffectOnce } from 'react-use'
import { Action, controlContext } from '../ui/controls'
import { useContext, useLayoutEffect, useState } from 'react'
import type {Config, Dimension, Picture, Solution} from '../types/types'
import { findSolution } from '../layout/find-solution'
import type { AsyncState } from 'react-use/lib/useAsyncFn'
import { inc } from 'ramda'
import { aspectRatioThreshold, maxComputationTime, minImages, sizeHomogeneity } from '../constants'

const config: Config = {
  aspectRatioThreshold,
  maxComputationTime,
  minImages,
  sizeHomogeneity
}

export const useCalculate = (images: Picture[], dimension: Dimension): AsyncState<Solution> => {
  const [redraw, forceUpdate] = useState(0)
  const { subscribe } = useContext(controlContext)
  const [status, trigger] = useAsyncFn(
    async () => findSolution(images, dimension, config),
    [images.length, dimension.width, dimension.height, redraw]
  )

  useLayoutEffect(() => {
    if (dimension.width > 0 && dimension.height > 0) {
      trigger()
    }
  }, [trigger, images.length, dimension.width, dimension.height, redraw])

  useEffectOnce(() => subscribe(Action.refresh, () => forceUpdate(inc)))

  return status
}

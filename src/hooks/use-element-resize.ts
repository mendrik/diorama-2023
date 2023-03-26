import { useState, useEffect, RefObject } from 'react'

import { Dimension } from '../types'
import { pipe, unless, isNil } from 'ramda'
import { debounce } from '../utils/debounce'

const getDimension = (el: HTMLElement): Dimension => ({
  width: el.offsetWidth,
  height: el.offsetHeight
})

export const useElementResize = (ref: RefObject<HTMLElement>): Dimension => {
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = pipe(getDimension, setDimension)
    const listener = debounce(300, () => unless(isNil, updateDimensions, ref.current))
    if (ref.current) {
      window.addEventListener('resize', listener)
      updateDimensions(ref.current)
    }
    return () => window.removeEventListener('resize', listener)
  }, [ref])

  return dimension
}

import { useState, RefObject, useRef, useEffect } from 'react'

import { Dimension } from '../types'
import { pipe } from 'ramda'
import { debounce } from '../utils/debounce'

const getDimension = (el: HTMLElement): Dimension => ({
  width: el.clientWidth,
  height: el.clientHeight
})

export const useElementResize = <T extends HTMLElement>(): [RefObject<T>, Dimension] => {
  const ref = useRef<T>(null)
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current === null) {
      return
    }
    const { current } = ref
    const updateDimensions = (): void => void pipe(getDimension, setDimension)(current)
    const ob = new ResizeObserver(debounce(120, updateDimensions))
    ob.observe(current)
    return () => ob.unobserve(current)
  }, [ref])

  return [ref, dimension]
}

import { useState, RefObject, useRef, useEffect } from 'react'

import type { Dimension } from '../types'
import { always, equals, pipe, unless } from 'ramda'
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
    const updateDimensions = (): void =>
      void pipe(getDimension, dim => setDimension(unless(equals(dim), always(dim))))(current)
    const ob = new ResizeObserver(debounce(80, updateDimensions))
    ob.observe(current)
    return () => ob.unobserve(current)
  }, [ref])

  return [ref, dimension]
}

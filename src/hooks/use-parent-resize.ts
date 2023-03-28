import { useState, RefObject, useRef, useLayoutEffect, startTransition } from 'react'

import type { Dimension } from '../types'
import { equals } from 'ramda'
import { debounce } from '../utils/debounce'

const getDimension = (el: Element): Dimension => ({
  width: el.clientWidth,
  height: el.clientHeight
})

export const useParentResize = <T extends HTMLElement>(): [RefObject<T>, Dimension] => {
  const ref = useRef<T>(null)
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current?.parentElement
    if (!el) {
      return
    }

    const updateDimensions = debounce(50, (): void => {
      const dim = getDimension(el)
      startTransition(() => {
        setDimension(old => (equals(old, dim) ? old : dim))
      })
    })
    const ob = new ResizeObserver(updateDimensions)
    ob.observe(el)
    return () => ob.disconnect()
  }, [ref])

  return [ref, dimension]
}

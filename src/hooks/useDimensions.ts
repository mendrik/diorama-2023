import { pipe } from 'ramda'
import { useEffect, useState } from 'react'
import { Dimension } from './../types.d'

const getDimension = (): Dimension => ({ width: window.innerWidth, height: window.innerHeight })

export const useWindowDimension = (): Dimension => {
  const [dimension, setDimension] = useState<Dimension>(getDimension())

  useEffect(() => {
    const listener = pipe(getDimension, setDimension)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  return dimension
}

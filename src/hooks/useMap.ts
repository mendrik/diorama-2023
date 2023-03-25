import { toPairs } from 'ramda'
import { useState } from 'react'

type MapValue<T> = T | undefined

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useMap = <K extends string | symbol, V>(initialValues?: Record<K, MapValue<V>>) => {
  const [map, setMap] = useState<Map<K, V>>(new Map<K, V>(toPairs(initialValues ?? {})))

  const getValue = (key: K): MapValue<V> => map.get(key)

  const setValue = (key: K, value: V): void => {
    const newMap = new Map(map)
    newMap.set(key, value)
    setMap(newMap)
  }

  return {
    map,
    getValue,
    setValue
  }
}

export default useMap

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

  const removeKey = (key: K): void => {
    const newMap = new Map(map)
    newMap.delete(key)
    setMap(newMap)
  }

  const clearMap = (): void => {
    setMap(new Map())
  }

  return {
    map,
    getValue,
    setValue,
    removeKey,
    clearMap
  }
}

export default useMap

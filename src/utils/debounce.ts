import type { AnyFunction } from 'ramda'
export const debounce = <T extends AnyFunction>(
  delay: number,
  func: T
): ((...args: Parameters<T>) => void) => {
  // eslint-disable-next-line functional/no-let
  let timeoutId: ReturnType<typeof setTimeout> | null
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

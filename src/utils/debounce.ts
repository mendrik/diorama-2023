/* eslint-disable functional/no-let */
import type { AnyFunction } from 'ramda'
export const debounce = <T extends AnyFunction>(
  delay: number,
  func: T
): ((...args: Parameters<T>) => void) => {
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

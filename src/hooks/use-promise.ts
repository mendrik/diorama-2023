import { useState } from 'react'

export type PromiseState<T> =
  | { status: 'initial'; result: null; error: null }
  | { status: 'loading'; result: null; error: null }
  | { status: 'done'; result: T; error: null }
  | { status: 'error'; result: null; error: Error }

type PromiseFn<T> = () => Promise<T>
type Execute = { execute: () => Promise<void> }

export type Status = PromiseState<unknown>['status']

const usePromise = <T>(promiseFn: PromiseFn<T>): PromiseState<T> & Execute => {
  const [state, setState] = useState<PromiseState<T>>({
    status: 'initial',
    result: null,
    error: null
  })

  const execute = async (): Promise<void> => {
    setState({ status: 'loading', result: null, error: null })

    try {
      const result = await promiseFn()
      setState({ status: 'done', result, error: null })
    } catch (error) {
      console.warn(error)
      if (error instanceof Error) {
        setState({ status: 'error', result: null, error })
      } else {
        console.error(`Unexpected error: ${error}`)
      }
    }
  }

  return {
    ...state,
    execute
  }
}

export default usePromise

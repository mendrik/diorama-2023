import { useCallback, useState } from 'react'

export type PromiseState<T> =
  | { status: 'initial'; result: null; error: null }
  | { status: 'loading'; result: null; error: null }
  | { status: 'done'; result: T; error: null }
  | { status: 'error'; result: null; error: Error }

type PromiseFn<T> = () => Promise<T>
type Execute = { execute: () => Promise<void> }

export type Status = PromiseState<any>['status']

const usePromise = <T>(promiseFn: PromiseFn<T>): PromiseState<T> & Execute => {
  const [state, setState] = useState<PromiseState<T>>({
    status: 'initial',
    result: null,
    error: null
  })

  const execute = async () => {
    setState({ status: 'loading', result: null, error: null })

    try {
      const result = await promiseFn()
      setState({ status: 'done', result, error: null })
    } catch (error: any) {
      console.warn(error)
      setState({ status: 'error', result: null, error })
    }
  }

  return {
    ...state,
    execute
  }
}

export default usePromise

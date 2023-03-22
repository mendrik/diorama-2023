import { useState } from 'react'

type PromiseState<T> =
  | { status: 'initial'; result: null; error: null }
  | { status: 'loading'; result: null; error: null }
  | { status: 'done'; result: T; error: null }
  | { status: 'error'; result: null; error: Error }

type PromiseFn<T> = () => Promise<T>
type Execute = { execute: () => Promise<void> }

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
      setState({ status: 'error', result: null, error })
    }
  }

  return {
    ...state,
    execute
  }
}

export default usePromise

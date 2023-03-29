import { useContext } from 'react'
import { Action, controlContext } from './controls'
import { useEffectOnce } from 'react-use'

export const ShowCrop = (): null => {
  const { subscribe } = useContext(controlContext)

  useEffectOnce(() => subscribe(Action.showCrop, () => document.body.classList.toggle('show-crop')))

  return null
}

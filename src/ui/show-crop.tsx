import { useContext, useEffect } from 'react'
import { Action, controlContext } from './controls'

export const ShowCrop = (): null => {
  const { subscribe } = useContext(controlContext)

  useEffect(
    () => subscribe(Action.showCrop, () => document.body.classList.toggle('show-crop')),
    [subscribe]
  )

  return null
}

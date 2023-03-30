import { useContext } from 'react'
import { Action, controlContext } from './controls'
import { useEffectOnce } from 'react-use'
import { createGlobalStyle } from 'styled-components'

const ShowCropCss = createGlobalStyle`
  body.show-crop .diorama-list > li {
    background-size: contain;
  }
`

export const ShowCrop = (): JSX.Element => {
  const { subscribe } = useContext(controlContext)

  useEffectOnce(() => subscribe(Action.showCrop, () => document.body.classList.toggle('show-crop')))

  return <ShowCropCss />
}

import { createGlobalStyle } from 'styled-components'
import type { Picture } from '../types'
import { Controls } from './controls'
import { Diorama } from './diorama'
import { ShowCrop } from './show-crop'

type OwnProps = {
  images: Picture[]
}

const ShowCropCss = createGlobalStyle`
  body.show-crop .diorama-list > li {
    background-size: contain;
  }

`
export const MainPage = ({ images }: OwnProps): JSX.Element => (
  <Controls>
    <ShowCropCss />
    <ShowCrop />
    <Diorama images={images} />
  </Controls>
)

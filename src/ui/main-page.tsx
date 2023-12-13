import type { JSX }   from 'react'
import styled from 'styled-components'
import type { Picture } from '../types/types'
import { Controls } from './controls'
import { Diorama } from './diorama'
import { ShowCrop } from './show-crop'

type OwnProps = {
  images: Picture[]
}

const FullSize = styled.div`
  width: 100vw;
  height: 100vh;
`

export const MainPage = ({ images }: OwnProps): JSX.Element => (
  <Controls>
    <ShowCrop />
    <FullSize>
      <Diorama images={images} />
    </FullSize>
  </Controls>
)

import type { JSX } from 'react'
import styled from 'styled-components'
import type { Picture } from '../types/types'
import { Controls } from './controls'
import { Diorama } from './diorama'

type OwnProps = {
  images: Picture[]
}

const FullSize = styled.div`
  width: 98svw;
  height: 98svh;
`

export const MainPage = ({ images }: OwnProps): JSX.Element => (
  <Controls>
    <FullSize>
      <Diorama images={images} />
    </FullSize>
  </Controls>
)

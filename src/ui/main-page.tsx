import { Picture } from '../types'
import { Controls } from './controls'
import { Diorama } from './diorama'
import { ShowCrop } from './show-crop'

type OwnProps = {
  images: Picture[]
}

export const MainPage = ({ images }: OwnProps): JSX.Element => (
  <Controls>
    <ShowCrop />
    <Diorama images={images} />
  </Controls>
)

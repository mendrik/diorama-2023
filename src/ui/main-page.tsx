import { Picture } from '../types'
import { Controls } from './controls'
import { ImageLayout } from './image-layout'
import { ShowCrop } from './show-crop'

type OwnProps = {
  images: Picture[]
}

export const MainPage = ({ images }: OwnProps): JSX.Element => (
  <Controls>
    <ShowCrop />
    <ImageLayout images={images} />
  </Controls>
)

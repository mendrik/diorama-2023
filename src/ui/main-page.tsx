import { Picture } from '../types'
import { Controls } from './controls'
import { ImageLayout } from './image-layout'

type OwnProps = {
  images: Picture[]
}

export const MainPage = ({ images }: OwnProps): JSX.Element => (
  <Controls>
    <ImageLayout images={images} />
  </Controls>
)

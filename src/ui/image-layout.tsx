import { Picture } from '../types'

type OwnProps = {
  images: Picture[]
}

export const ImageLayout = ({ images }: OwnProps): JSX.Element => <div>Images</div>

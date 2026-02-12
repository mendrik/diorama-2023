import { range } from 'remeda'
import { ImageSet, maxImages } from '../constants'
import type { Picture, RelativeUrl } from '../types/types'

const imagePromise = (url: RelativeUrl): Promise<Picture> =>
  new Promise<Picture>((res, rej) => {
    const img = new Image()
    img.onload = (): void =>
      res({
        dimension: {
          width: img.width,
          height: img.height
        },
        aspectRatio: img.width / img.height,
        url
      })
    img.onerror = rej
    img.src = url
  })

export const loadImages = (imageset: ImageSet): Promise<Picture[]> => {
  const imageUrls = range(1, maxImages[imageset] + 1).map(
    i => `./images/${ImageSet[imageset]}/${i}.jpg`
  )
  return Promise.all(imageUrls.map(imagePromise))
}

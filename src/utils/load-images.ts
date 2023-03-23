/* eslint-disable functional/immutable-data */
import { Picture, RelaltiveUrl } from '../types'

const imagePromise = (url: RelaltiveUrl): Promise<Picture> =>
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

export const loadImages = (imageUrls: RelaltiveUrl[]): Promise<Picture[]> =>
  Promise.all(imageUrls.map(imagePromise))

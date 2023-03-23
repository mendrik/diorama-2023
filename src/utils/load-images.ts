import { Picture, RelaltiveUrl } from '../types'

const imagePromise = (url: RelaltiveUrl) =>
  new Promise<Picture>((res, rej) => {
    const img = new Image()
    img.onload = () =>
      res({
        dimension: {
          width: img.width,
          height: img.height
        },
        aspectRatio: img.width / img.height,
        url
      })
    img.src = url
  })

export const loadImages = (imageUrls: RelaltiveUrl[]): Promise<Picture[]> =>
  Promise.all(imageUrls.map(imagePromise))

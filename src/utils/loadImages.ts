import { RelaltiveUrl } from '../types'

type Picture = {
  width: number
  height: number
  url: RelaltiveUrl
}

const imagePromise = (url: RelaltiveUrl) =>
  new Promise<Picture>((res, rej) => {
    const img = new Image()
    img.onload = () =>
      res({
        width: img.width,
        height: img.height,
        url
      })
    img.src = url
  })

export const loadImages = (imageUrls: RelaltiveUrl[]): Promise<Picture[]> =>
  Promise.all(imageUrls.map(imagePromise))

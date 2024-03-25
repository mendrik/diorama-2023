/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Picture, RelativeUrl } from '../types/types'
import { ImageSet } from '../constants'
import { range } from 'ramda'

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
  const imageUrls = range(1, imageset).map(i => `/images/${ImageSet[imageset]}/${i}.jpg`)
  return Promise.all(imageUrls.map(imagePromise))
}

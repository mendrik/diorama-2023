import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { F, length, max, min, nth, nthArg, pipe, T } from 'ramda'
import { ImageSet, initialImageAmount } from '../constants'
import { runWorker } from '../layout/worker'
import { Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { loadImages } from '../utils/load-images'

const $imageStore = createStore<Picture[]>([])
const $imageStoreLength = $imageStore.map(length)
const $currentImageCount = createStore<number>(initialImageAmount)

const $currentImages = createStore<Picture[]>([])
export const $solution = createStore<Solution | null>(null)
export const $targetDimension = createStore<Dimension>({ width: 0, height: 0 })
export const $blur = createStore(false)

export const loadImageSet = createEffect((set: ImageSet) =>
  Promise.all([loadImages(set), new Promise(res => setTimeout(res, 500))]).then(nth(0))
)
export const addImage = createEvent()
export const removeImage = createEvent()
export const refresh = createEvent()
export const dimensionChanged = createEvent()

const addImageSource = combine($currentImageCount, $imageStoreLength)
sample({
  source: addImageSource,
  clock: addImage,
  fn: ([count, maxImages]) => min(maxImages, count + 1),
  target: $currentImageCount
})

$currentImageCount.on(
  removeImage,
  pipe(n => max(1, n - 1))
)
$imageStore.on(loadImageSet.doneData, nthArg(1))
$currentImageCount.on(loadImageSet.doneData, () => initialImageAmount)
$blur.on(loadImageSet, T)
$blur.on(loadImageSet.done, F)
$targetDimension.on(dimensionChanged, nthArg(1))

sample({
  source: [$imageStore, $currentImageCount] as [typeof $imageStore, typeof $currentImageCount],
  fn: ([pics, count]) => pics.slice(0, count),
  target: $currentImages
})

const solutionSource = combine($currentImages, $targetDimension)

const canFindSolution = ([pics, dim]: [Picture[], Dimension]) =>
  isNotEmpty(pics) && dim.width > 0 && dim.height > 0

const calculateSolution = createEffect(([pic, dim]: [Picture[], Dimension]) => runWorker(pic, dim))
$solution.on(calculateSolution.doneData, nthArg(1))

sample({
  source: solutionSource,
  clock: refresh,
  filter: canFindSolution,
  target: calculateSolution
})

sample({
  source: solutionSource,
  filter: canFindSolution,
  target: calculateSolution
})

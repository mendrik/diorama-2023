import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { Picture } from '../../lib'
import { Dimension, Solution } from '../types/types'
import { initialImageAmount } from '../constants'
import { loadImages } from '../utils/load-images'
import { max, min, nthArg, pipe } from 'ramda'
import { isNotEmpty } from '../utils/isNotEmpty'
import { runWorker } from '../layout/worker'

const $imageStore = createStore<Picture[]>([])
const $imageStoreLength = $imageStore.map(pics => pics.length)
const $currentImageCount = createStore<number>(initialImageAmount)

const $currentImages = createStore<Picture[]>([])
export const $solution = createStore<Solution | null>(null)
export const $targetDimension = createStore<Dimension>({ width: 0, height: 0 })
export const $blur = createStore(false)

export const loadImageSet = createEffect(loadImages)
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
$currentImageCount.on(loadImageSet, () => initialImageAmount)
$imageStore.on(loadImageSet.doneData, nthArg(1))
$blur.on(loadImageSet, () => true)
$blur.on(loadImageSet.done, () => false)
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

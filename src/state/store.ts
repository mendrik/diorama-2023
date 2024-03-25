import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { Picture } from '../../lib'
import { Dimension, Solution } from '../types/types'
import { initialImageAmount } from '../constants'
import { loadImages } from '../utils/load-images'
import { dec, inc, nthArg, apply, min } from 'ramda'
import { findSolution } from '../layout/find-solution'
import { isNotEmpty } from '../utils/isNotEmpty'

const $imageStore = createStore<Picture[]>([])
const $imageStoreLength = $imageStore.map(pics => pics.length)
const $currentImageCount = createStore<number>(initialImageAmount)

const $currentImages = createStore<Picture[]>([])
export const $solution = createStore<Solution | null>(null)
export const $targetDimension = createStore<Dimension>({ width: 0, height: 0 })

export const loadImageSet = createEffect(loadImages)
export const addImage = createEvent()
export const removeImage = createEvent()
export const refresh = createEvent()
export const dimensionChanged = createEvent()

$currentImageCount.on(addImage, inc)
$currentImageCount.on(removeImage, dec)

sample({
  source: combine($currentImageCount, $imageStoreLength),
  clock: addImage,
  fn: ([count, maxImages]) => min(maxImages, count + 1),
  target: $currentImageCount
})

$currentImageCount.on(removeImage, dec)
$currentImageCount.on(loadImageSet, () => initialImageAmount)
$imageStore.on(loadImageSet.doneData, nthArg(1))
$targetDimension.on(dimensionChanged, nthArg(1))

const solutionSource = combine($currentImages, $targetDimension)

const canFindSolution = ([pics, dim]: [Picture[], Dimension]) =>
  isNotEmpty(pics) && dim.width > 0 && dim.height > 0

sample({
  source: [$imageStore, $currentImageCount] as [typeof $imageStore, typeof $currentImageCount],
  fn: ([pics, count]) => pics.slice(0, count),
  target: $currentImages
})

sample({
  source: solutionSource,
  fn: apply(findSolution),
  filter: canFindSolution,
  target: $solution
})

sample({
  source: solutionSource,
  clock: refresh,
  filter: canFindSolution,
  fn: apply(findSolution),
  target: $solution
})

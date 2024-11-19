import {
	combine,
	createEffect,
	createEvent,
	createStore,
	sample
} from 'effector'
import { F, T, length, max, min, nth, nthArg, pipe } from 'ramda'
import { type ImageSet, initialImageAmount } from '../constants'
import { runWorker } from '../layout/worker'
import type { Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { loadImages } from '../utils/load-images'

const $imageStore = createStore<Picture[]>([])
const $imageStoreLength = $imageStore.map(length)
const $currentImageCount = createStore<number>(initialImageAmount)

const $currentImages = createStore<Picture[]>([])
export const $solution = createStore<Solution | null>(null)
export const $targetDimension = createStore<Dimension>({ width: 0, height: 0 })
export const $blur = createStore(false)
export const $cropState = createStore(true)
export const $crop = createStore(true)

export const loadImageSet = createEffect((set: ImageSet) =>
	Promise.all([loadImages(set), new Promise(res => setTimeout(res, 500))]).then(
		nth(0)
	)
)
export const addImage = createEvent()
export const removeImage = createEvent()
export const refresh = createEvent()
export const crop = createEvent()
export const dimensionChanged = createEvent()

const addImageSource = combine($currentImageCount, $imageStoreLength)
sample({
	source: addImageSource,
	clock: addImage,
	fn: ([count, maxImages]) => min(maxImages, count + 1),
	target: $currentImageCount
})

sample({
	source: [$cropState, $currentImageCount] as [
		typeof $cropState,
		typeof $currentImageCount
	],
	fn: ([crop, images]) => crop && images > 6,
	target: $crop
})

$currentImageCount.on(
	removeImage,
	pipe(n => max(1, n - 1))
)
$imageStore.on(loadImageSet.doneData, nthArg(1))
$currentImageCount.on(loadImageSet.doneData, () => initialImageAmount)
$blur.on(loadImageSet, T)
$blur.on(loadImageSet.done, F)
$cropState.on(crop, s => !s)
$targetDimension.on(dimensionChanged, nthArg(1))

sample({
	source: [$imageStore, $currentImageCount] as [
		typeof $imageStore,
		typeof $currentImageCount
	],
	fn: ([pics, count]) => pics.slice(0, count),
	target: $currentImages
})

const solutionSource = combine($currentImages, $targetDimension)

const canFindSolution = ([pics, dim]: [Picture[], Dimension]) =>
	isNotEmpty(pics) && dim.width > 0 && dim.height > 0

const calculateSolution = createEffect(([pic, dim]: [Picture[], Dimension]) =>
	runWorker(pic, dim)
)
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

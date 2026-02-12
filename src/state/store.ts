import {
	combine,
	createEffect,
	createEvent,
	createStore,
	sample
} from 'effector'
import { type ImageSet, initialImageAmount } from '../constants'
import { runWorker } from '../layout/worker'
import type { Dimension, Picture, Solution } from '../types/types'
import { isNotEmpty } from '../utils/isNotEmpty'
import { loadImages } from '../utils/load-images'

const $imageStore = createStore<Picture[]>([])
const $imageStoreLength = $imageStore.map(s => s.length)
const $currentImageCount = createStore<number>(initialImageAmount)

const $currentImages = createStore<Picture[]>([])
export const $solution = createStore<Solution | null>(null)
export const $targetDimension = createStore<Dimension>({ width: 0, height: 0 })
export const $blur = createStore(false)
export const $cropState = createStore(true)
export const $crop = createStore(true)

export const loadImageSet = createEffect((set: ImageSet) =>
	Promise.all([loadImages(set), new Promise(res => setTimeout(res, 500))]).then(
		res => res[0]
	)
)
export const addImage = createEvent()
export const removeImage = createEvent()
export const refresh = createEvent()
export const crop = createEvent()
export const dimensionChanged = createEvent<Dimension>()

const addImageSource = combine($currentImageCount, $imageStoreLength)
sample({
	source: addImageSource,
	clock: addImage,
	fn: ([count, maxImages]) => Math.min(maxImages, count + 1),
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
	n => Math.max(1, n - 1)
)
$imageStore.on(loadImageSet.doneData, (_, pics) => pics)
$currentImageCount.on(loadImageSet.doneData, () => initialImageAmount)
$blur.on(loadImageSet, () => true)
$blur.on(loadImageSet.done, () => false)
$cropState.on(crop, s => !s)
$targetDimension.on(dimensionChanged, (_, dim) => dim)

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
$solution.on(calculateSolution.doneData, (_, sol) => sol)

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

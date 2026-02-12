import type { Picture, Rect } from '../types/types'
import { randomInt } from '../utils/random'
import { Composition } from './composition'

// eslint-disable-next-line no-restricted-syntax
export function* generateTreeCompositions(
	pictures: Picture[]
): Generator<Rect> {
	if (pictures.length === 1) {
		yield pictures[0] // A single picture is a valid Rect
	} else {
		for (let i = 1; i < pictures.length; i++) {
			const leftSubtrees = generateTreeCompositions(pictures.slice(0, i))
			const rightSubtrees = generateTreeCompositions(pictures.slice(i))

			for (const left of leftSubtrees) {
				for (const right of rightSubtrees) {
					// Explore both orientations for each combination of subtrees
					yield new Composition(true, left, right)
					yield new Composition(false, left, right)
				}
			}
		}
	}
}

const treeGenerator = (compositions: Rect[]): Composition => {
	const max = compositions.length - 1
	if (max === 0) {
		return compositions[0] as Composition
	}
	if (max === 1) {
		return new Composition(
			randomInt(0, 1) === 0,
			compositions[0],
			compositions[1]
		)
	}
	const index1 = randomInt(0, max)
	// eslint-disable-next-line no-var
	let index2: number
	do {
		index2 = randomInt(0, max)
	} while (index1 === index2)
	const merged = new Composition(
		randomInt(0, 1) === 0,
		compositions[index1],
		compositions[index2]
	)

	return treeGenerator(compositions.with(index1, merged).toSpliced(index2, 1))
}


const randomSplit = (length: number): number => {
	// A simple bell-curve-like distribution around length / 2
	// We want to favor balanced splits for uniformity
	if (length === 2) return 1
	const center = Math.floor(length / 2)
	// Randomly shift only slightly from the center to add variety but keep uniformity high
	const variance = Math.max(1, Math.floor(length / 4))
	const shift = randomInt(-variance, variance)
	const split = center + shift
	return Math.max(1, Math.min(length - 1, split))
}

const orderedTreeGenerator = (pictures: Picture[]): Rect => {
	const len = pictures.length
	if (len === 1) {
		return pictures[0]
	}

	const split = randomSplit(len)
	const left = orderedTreeGenerator(pictures.slice(0, split))
	const right = orderedTreeGenerator(pictures.slice(split))

	return new Composition(randomInt(0, 1) === 0, left, right)
}

// eslint-disable-next-line no-restricted-syntax
export function* toOrderedTreeGenerator(
	pictures: Picture[]
): Generator<Rect> {
	while (true) {
		yield orderedTreeGenerator(pictures)
	}
}

import '../types/ramda'

import {
	type Ord,
	T as _,
	cond,
	equals as eq,
	evolve,
	flip,
	last,
	lte,
	pipe,
	prop,
	sortBy,
	takeLast
} from 'ramda'
import type { NonEmptyArray, PositionedPicture, Solution } from '../types/types'

export const defaultStrategy = ({ sizeHomogeneity, score }: Solution): Ord => {
	return score * sizeHomogeneity
}

/**
 * Now you probably are really puzzled about these magic numbers here.
 * But there is this island of image counts that works best when we
 * sort solution by the default strategy but in the end prefer better fitments.
 * So we ignore uniformity to some extent. I know this is a strange, but I tested
 * this thoroughly and it looks the best.
 */
const outOfBest = cond<[number], number>([
	[flip(lte)(9), () => 35],
	[eq(10), () => 25],
	[eq(11), () => 20],
	[eq(12), () => 10],
	[_, () => 5]
])

export const evaluateSolutions = (
	results: NonEmptyArray<Solution>
): Solution => {
	const images = results[0].pictures.length

	const sorted = pipe(
		sortBy(defaultStrategy),
		takeLast(outOfBest(images)),
		sortBy(prop('score'))
	)(results)

	return evolve(
		{ pictures: sortBy<PositionedPicture>(prop('url')) },
		last(sorted) as Solution
	)
}

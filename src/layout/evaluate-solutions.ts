
import '../types/ramda'

import {
	type Ord,
	T as _,
	cond,
	equals as eq,
	flip,
	last,
	lte,
	pipe,
	prop,
	sortBy,
	takeLast
} from 'ramda'
import type { NonEmptyArray, Solution } from '../types/types'

export const defaultStrategy = ({
	sizeHomogeneity: size,
	score,
	balance,
	pictures
}: Solution): Ord => {
	// Original formula: square score for <= 10, square size for > 12
	return (
		(pictures.length <= 10 ? score * score : score) *
		(pictures.length > 12 ? size * size : size) *
		balance
	)
}

/**
 * Now you probably are really puzzled about these magic numbers here.
 * But there is this island of image counts that works best when we
 * sort solution by the default strategy but in the end prefer better fitments.
 * So we ignore uniformity to some extent. I know this is a strange, but I tested
 * this thoroughly and it looks the best.
 */
const outOfBest = cond<[number], number>([
	[flip(lte)(9), () => 15],
	[eq(10), () => 15],
	[eq(11), () => 10],
	[eq(12), () => 5],
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
		// Logic: Sort by balanced strategy, take top N, then pick best MATCH (score) from those.
		// This sacrifices some uniformity/balance for better aspect ratio fit, preventing gaps.
		// Crucially: NO sortBy('url') at the end, so order is preserved.
	)(results)

	return last(sorted) as Solution
}

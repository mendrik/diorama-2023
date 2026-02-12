import { pipe, sortBy } from 'remeda'
import type { NonEmptyArray, Solution } from '../types/types'

export const defaultStrategy = ({
	sizeHomogeneity: size,
	score,
	balance,
	pictures
}: Solution): number => {
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
const outOfBest = (n: number) => {
	if (n <= 9) return 15
	if (n === 10) return 15
	if (n === 11) return 10
	if (n === 12) return 5
	return 5
}

export const evaluateSolutions = (
	results: NonEmptyArray<Solution>
): Solution => {
	const images = results[0].pictures.length
	const sorted = pipe(
		results,
		sortBy(defaultStrategy),
		x => x.slice(-outOfBest(images)),
		sortBy(x => x.score)
		// Logic: Sort by balanced strategy, take top N, then pick best MATCH (score) from those.
		// This sacrifices some uniformity/balance for better aspect ratio fit, preventing gaps.
	)

	return sorted[sorted.length - 1] as Solution
}

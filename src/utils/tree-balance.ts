import { type Rect, isPicture } from '../types/types'

function* traverseTree(
	node: Rect,
	depth: number
): Generator<number, void, unknown> {
	if (isPicture(node)) {
		yield depth
	} else {
		// Yield the depths of both branches in the composition
		yield* traverseTree(node.first, depth + 1)
		yield* traverseTree(node.second, depth + 1)
	}
}

export const treeBalance = (node: Rect): number => {
	// Collect all depths of the Picture leaves
	const leafDepths = [...traverseTree(node, 0)]
	if (leafDepths.length === 0) return 0

	// Max depth in the tree
	const maxDepth = Math.max(...leafDepths)

	// Calculate normalized balance
	const minLeafDepth = Math.min(...leafDepths)

	return 1 - (maxDepth - minLeafDepth) / maxDepth
}

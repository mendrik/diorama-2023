import { type Remote, wrap } from 'comlink'
import type { findSolution } from './find-solution'

export const runWorker = (
	...args: Parameters<typeof findSolution>
): Promise<ReturnType<typeof findSolution>> => {
	const workerInstance: Remote<{ findSolution: typeof findSolution }> = wrap(
		new Worker(new URL('./find-solution', import.meta.url), {
			type: 'module'
		})
	)
	return workerInstance.findSolution(...args)
}

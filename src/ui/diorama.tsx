import { useUnit } from 'effector-react'
import { useLayoutEffect } from 'react'
import { ImageSet } from '../constants'
import {
    $blur,
    $solution,
    $targetDimension,
    dimensionChanged,
    loadImageSet
} from '../state/store'
import type { Dimension, Solution } from '../types/types'
import { debounce } from '../utils/debounce'
import { PictureListItem } from './picture-list-item'

const scale = (
	value: Solution,
	dimension: Dimension,
	p: 'width' | 'height'
): number => dimension[p] / value.dimension[p]

const updateDimensionsOf = debounce(
	400,
	(el: HTMLElement) => {
		const { width, height } = el.getBoundingClientRect()
		dimensionChanged({ width, height })
	}
)

export const Diorama = () => {
	const [solution, dimension, blur] = useUnit([
		$solution,
		$targetDimension,
		$blur
	])

	useLayoutEffect(() => {
		const el = document.getElementById('diorama-list')
		if (el == null) {
			throw new Error('diorama-list not found')
		}
		const ob = new ResizeObserver(() => updateDimensionsOf(el))
		ob.observe(el)
		updateDimensionsOf(el)
		void loadImageSet(ImageSet.animals)
	}, [])

	return (
		<ol id="diorama-list" className={`${blur ? 'blur' : ''}`}>
			{solution?.pictures.map((pic, idx) => (
				<PictureListItem
					picture={pic}
					key={pic.url}
					scaleX={scale(solution, dimension, 'width')}
					scaleY={scale(solution, dimension, 'height')}
				/>
			))}
		</ol>
	)
}

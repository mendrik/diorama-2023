import { useUnit } from 'effector-react'
import type { ReactElement } from 'react'
import screenfull from 'screenfull'
import {
    Crop,
    PhotoMinus,
    PhotoPlus,
    Refresh,
    WindowMaximize
} from 'tabler-icons-react'
import { ImageSet, iconSize } from '../constants'
import {
    $crop,
    addImage,
    crop,
    loadImageSet,
    refresh,
    removeImage
} from '../state/store'

export const Controls = (): ReactElement => {
	const cropActive = useUnit($crop)
	return (
		<ol className="controls">
			<li>
				<select onChange={e => loadImageSet(e.target.value as any)}>
					<option value={ImageSet.animals}>Animals</option>
					<option value={ImageSet.family}>Photos</option>
					<option value={ImageSet.art}>Art</option>
				</select>
			</li>
			<li>
				<button
					onClick={() => crop()}
					title="allow slight cropping"
					type="button"
				>
					<Crop
						size={iconSize}
						color={cropActive ? 'white' : 'lightgray'}
						strokeWidth={1.5}
					/>
				</button>
			</li>
			<li>
				<button onClick={() => refresh()} title="rearrange" type="button">
					<Refresh size={iconSize} color="white" strokeWidth={1.5} />
				</button>
			</li>
			<li>
				<button onClick={() => addImage()} title="add image" type="button">
					<PhotoPlus size={iconSize} color="white" strokeWidth={1.5} />
				</button>
			</li>
			<li>
				<button
					onClick={() => removeImage()}
					title="remove image"
					type="button"
				>
					<PhotoMinus size={iconSize} color="white" strokeWidth={1.5} />
				</button>
			</li>
			{screenfull.isEnabled && (
				<li>
					<button
						onClick={() => void screenfull.request()}
						title="fullscreen"
						type="button"
					>
						<WindowMaximize size={iconSize} color="white" strokeWidth={1.5} />
					</button>
				</li>
			)}
		</ol>
	)
}

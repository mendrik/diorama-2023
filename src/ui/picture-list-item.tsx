import { useUnit } from 'effector-react'
import { $crop } from '../state/store'
import type { PositionedPicture } from '../types/types'

type OwnProps = {
	picture: PositionedPicture
	scaleX: number
	scaleY: number
}

export const PictureListItem = ({
	picture: { position, dimension, url },
	scaleX,
	scaleY
}: OwnProps): JSX.Element => {
	const crop = useUnit($crop)
	const aspectRatio = dimension.width / dimension.height
	return (
		<li
			className={`photo-frame`}
			style={{
				left: position.x * scaleX,
				top: position.y * scaleY,
				width: dimension.width * scaleX,
				height: dimension.height * scaleY
			}}
		>
			<img
				className={`photo ${crop ? 'crop' : ''}`}
				src={url}
				alt=""
				style={{
					aspectRatio
				}}
			/>
		</li>
	)
}

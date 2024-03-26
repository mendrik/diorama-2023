import { ReactElement } from 'react'
import { iconSize, ImageSet } from '../constants'
import { PhotoPlus, PhotoMinus, Refresh, WindowMaximize } from 'tabler-icons-react'
import screenfull from 'screenfull'
import { addImage, loadImageSet, refresh, removeImage } from '../state/store'
import { pipe } from 'ramda'
import { eventValue } from '../utils/dom-event'

export const Controls = (): ReactElement => {
  return (
    <ol className="controls">
      <li>
        <select onChange={pipe(eventValue, loadImageSet)}>
          <option value={ImageSet.animals}>Animals</option>
          <option value={ImageSet.family}>Photos</option>
          <option value={ImageSet.art}>Art</option>
        </select>
      </li>
      <li>
        <button onClick={() => refresh()} title="rearrange">
          <Refresh size={iconSize} color="white" strokeWidth={1.5} />
        </button>
      </li>
      <li>
        <button onClick={() => addImage()} title="add image">
          <PhotoPlus size={iconSize} color="white" strokeWidth={1.5} />
        </button>
      </li>
      <li>
        <button onClick={() => removeImage()} title="remove image">
          <PhotoMinus size={iconSize} color="white" strokeWidth={1.5} />
        </button>
      </li>
      {screenfull.isEnabled && (
        <li>
          <button onClick={() => void screenfull.request()} title="fullscreen">
            <WindowMaximize size={iconSize} color="white" strokeWidth={1.5} />
          </button>
        </li>
      )}
    </ol>
  )
}

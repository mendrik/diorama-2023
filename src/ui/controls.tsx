import { ReactElement } from 'react'
import { iconSize, ImageSet } from '../constants'
import { PhotoPlus, PhotoMinus, Refresh, WindowMaximize } from 'tabler-icons-react'
import screenfull from 'screenfull'
import styled from 'styled-components'
import { addImage, loadImageSet, refresh, removeImage } from '../state/store'
import { pipe } from 'ramda'
import { eventValue } from '../utils/dom-event'

const ButtonList = styled.ol`
  position: absolute;
  display: flex;
  gap: 10px;
  right: 5px;
  bottom: 5px;
  width: fit-content;
  height: fit-content;
  z-index: 1;
  background-color: rgb(108, 108, 108, 0.7);
  border-radius: 4px;
  list-style: none;
  padding: 4px;
  box-shadow:
    inset 1px 1px 1px rgba(200, 200, 200, 0.7),
    inset -1px -1px 1px rgba(60, 60, 60, 0.7),
    3px 3px 7px -3px rgba(0, 0, 0, 0.7);

  > li {
    display: contents;
  }

  & button {
    appearance: none;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-items: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 2px;

    svg {
      width: 100%;
      height: 100%;
    }

    &:hover,
    &:active {
      background-color: rgba(200, 200, 200, 0.4);
    }
  }
`

export const Controls = (): ReactElement => {
  return (
    <ButtonList>
      <li>
        <select onChange={pipe(eventValue, loadImageSet)}>
          <option value={ImageSet.animals}>Animals</option>
          <option value={ImageSet.family}>Photos</option>
          <option value={ImageSet.art}>Art</option>
        </select>
      </li>
      <li>
        <button onClick={() => refresh()} title="rearrange">
          <Refresh size={iconSize} color="white" />
        </button>
      </li>
      <li>
        <button onClick={() => addImage()} title="add image">
          <PhotoPlus size={iconSize} color="white" />
        </button>
      </li>
      <li>
        <button onClick={() => removeImage()} title="remove image">
          <PhotoMinus size={iconSize} color="white" />
        </button>
      </li>
      {screenfull.isEnabled && (
        <li>
          <button onClick={() => void screenfull.request()} title="fullscreen">
            <WindowMaximize size={iconSize} color="white" />
          </button>
        </li>
      )}
    </ButtonList>
  )
}

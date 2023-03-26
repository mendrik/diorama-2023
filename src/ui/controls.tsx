/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, createContext, useCallback, useMemo } from 'react'
import { Config, OnAction, Unsubscribe } from '../types'
import { iconSize } from '../constants'
import { BoxPadding, LayoutGridAdd, Refresh, Trash, WindowMaximize } from 'tabler-icons-react'
import { concat, without } from 'ramda'
import { uninitialized } from '../utils/uninitialized'
import { useMap } from '../hooks/use-map'
import screenfull from 'screenfull'
import styled from 'styled-components'

export enum Action {
  refresh = 'refresh',
  showCrop = 'showCrop',
  addImage = 'addImage',
  removeImage = 'removeImage'
}

export const controlContext = createContext<Config<Action>>(uninitialized())

const ButtonList = styled.ol`
  position: absolute;
  display: flex;
  gap: 10px;
  top: 5px;
  left: 5px;
  width: fit-content;
  height: auto;
  z-index: 1;
  background-color: rgb(108, 108, 108);
  border-radius: 4px;
  list-style: none;
  padding: 4px;
  box-shadow: inset 1px 1px 1px rgba(200, 200, 200, 0.7), inset -1px -1px 1px rgba(60, 60, 60, 0.7),
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

    &:hover,
    &:active {
      background-color: rgba(200, 200, 200, 0.4);
    }
  }
`

export const Controls = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  const { setValue, getValue } = useMap<Action, Array<OnAction>>()

  const unsubscribe = useCallback((action: Action, fn: OnAction): void => {
    const subs = getValue(action) ?? []
    setValue(action, without([fn], subs))
  }, [])

  const subscribe = useCallback((action: Action, fn: OnAction): Unsubscribe => {
    const subs = getValue(action) ?? []
    setValue(action, concat([fn], subs))
    return () => unsubscribe(action, fn)
  }, [])

  const call = (action: Action) => () => {
    const subs = getValue(action)
    subs?.forEach(doAction => doAction())
  }

  const value = useMemo(() => ({ subscribe }), [])

  return (
    <controlContext.Provider value={value}>
      <ButtonList>
        <li>
          <button onClick={call(Action.refresh)} title="rearrange">
            <Refresh size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.showCrop)} title="show cropping">
            <BoxPadding size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.addImage)} title="add image">
            <LayoutGridAdd size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.removeImage)} title="remove image">
            <Trash size={iconSize} color="white" />
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
      {children}
    </controlContext.Provider>
  )
}

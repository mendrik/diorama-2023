/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, createContext, useCallback, EffectCallback } from 'react'
import { iconSize, ImageSet } from '../constants'
import { PhotoMinus, WindowMaximize, Layout2, Users, Paw, PhotoPlus } from 'tabler-icons-react'
import { concat, without } from 'ramda'
import { uninitialized } from '../utils/uninitialized'
import screenfull from 'screenfull'
import styled from 'styled-components'
import { useMap } from 'react-use'

export enum Action {
  switchImageSet = 'switchImageSet',
  showCrop = 'showCrop',
  addImage = 'addImage',
  removeImage = 'removeImage',
  switchMode = 'switchMode'
}

type Unsubscribe = Exclude<ReturnType<EffectCallback>, void>
type OnAction = (...args: unknown[]) => unknown

type Subscriber<T> = {
  subscribe: (action: T, fn: OnAction) => Unsubscribe
}
export const controlContext = createContext<Subscriber<Action>>(uninitialized())

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

export const Controls = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  const [, { set, get }] = useMap<Record<Action, Array<OnAction>>>()

  const unsubscribe = useCallback(
    (action: Action, fn: OnAction): void => {
      const subs = get(action) ?? []
      set(action, without([fn], subs))
    },
    [set, get]
  )

  const subscribe = useCallback(
    (action: Action, fn: OnAction): Unsubscribe => {
      const subs = get(action) ?? []
      set(action, concat([fn], subs))
      return () => unsubscribe(action, fn)
    },
    [get, set, unsubscribe]
  )

  const call =
    (action: Action, ...args: any[]) =>
    () => {
      const subs = get(action)
      subs?.forEach(doAction => doAction(...args))
    }

  return (
    <controlContext.Provider value={{ subscribe }}>
      <ButtonList>
        <li>
          <button onClick={call(Action.switchImageSet, ImageSet.portraits)} title="Portraits">
            <Users size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.switchImageSet, ImageSet.animals)} title="Animas">
            <Paw size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.addImage)} title="add image">
            <PhotoPlus size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.removeImage)} title="remove image">
            <PhotoMinus size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button
            onClick={call(Action.switchMode)}
            title="less gaps, but also less size uniformity"
          >
            <Layout2 size={iconSize} color="white" />
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

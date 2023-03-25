/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, createContext, useCallback } from 'react'
import { Config, OnAction, Unsubscribe } from '../types'
import { iconSize } from '../constants'
import { BoxPadding, LayoutGridAdd, Refresh, Trash, WindowMaximize } from 'tabler-icons-react'
import { concat, without } from 'ramda'
import { uninitialized } from '../utils/uninitialized'
import { useMap } from '../hooks/useMap'
import screenfull from 'screenfull'

export enum Action {
  refresh = 'refresh',
  showCrop = 'showCrop',
  addImage = 'addImage',
  removeImage = 'removeImage'
}

export const controlContext = createContext<Config<Action>>(uninitialized())

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

  return (
    <controlContext.Provider value={{ subscribe }}>
      <ul className="controls">
        <li>
          <button onClick={call(Action.refresh)}>
            <Refresh size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.showCrop)}>
            <BoxPadding size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.addImage)}>
            <LayoutGridAdd size={iconSize} color="white" />
          </button>
        </li>
        <li>
          <button onClick={call(Action.removeImage)}>
            <Trash size={iconSize} color="white" />
          </button>
        </li>
        {screenfull.isEnabled && (
          <li>
            <button onClick={() => void screenfull.request()}>
              <WindowMaximize size={iconSize} color="white" />
            </button>
          </li>
        )}
      </ul>
      {children}
    </controlContext.Provider>
  )
}

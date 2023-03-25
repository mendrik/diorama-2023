import { PropsWithChildren, createContext } from 'react'
import { Config, OnAction, Unsubscribe } from '../types'
import { iconSize } from '../constants'
import { BoxPadding, LayoutGridAdd, Refresh, Trash, WindowMaximize } from 'tabler-icons-react'
import { append, without } from 'ramda'
import { uninitialized } from '../utils/uninitialized'
import useMap from '../hooks/useMap'

export enum Action {
  refresh = 'refresh',
  showCrop = 'showCrop',
  addImage = 'addImage',
  removeImage = 'removeImage',
  maximizeWindow = 'maximizeWindow'
}

export const configContext = createContext<Config<Action>>(uninitialized())

export const Controls = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  const { setValue, getValue } = useMap<Action, Array<OnAction>>()

  const unsubscribe = (action: Action, fn: OnAction): void => {
    const subs = getValue(action) ?? []
    setValue(action, without([fn], subs))
  }

  const subscribe = (action: Action, fn: OnAction): Unsubscribe => {
    const subs = getValue(action) ?? []
    setValue(action, append(fn, subs))
    return () => unsubscribe(action, fn)
  }

  const call = (action: Action) => () => {
    const subs = getValue(action) ?? []
    subs.forEach(doAction => doAction())
  }

  return (
    <configContext.Provider value={{ subscribe }}>
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
        <li>
          <button onClick={call(Action.maximizeWindow)}>
            <WindowMaximize size={iconSize} color="white" />
          </button>
        </li>
      </ul>
      {children}
    </configContext.Provider>
  )
}
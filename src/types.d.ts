import type { AnyFunction } from 'ramda'
import { Composition } from './layout/composition'
import { Position, Dimension } from './types.d'

type Brand<T extends string> = { __tag: T }

export type RelaltiveUrl = string
export type Milliseconds = number & Brand<'ms'>

export type Picture = {
  dimension: Dimension
  aspectRatio: number
  url: RelaltiveUrl
}

export type PositionedPicture = {
  position: Position
  dimension: Dimension
  url: RelaltiveUrl
}

export type Solution = {
  pictures: PositionedPicture[]
  aspectRatioDelta: number
  sizeHomogeneity: number
  dimension: Dimension
}

export type Leaf = {
  picture: Picture
}

export type Node = {
  horizontal: boolean
  first: Composition
  second: Composition
}

export type Dimension = { width: number; height: number }
export type Position = { x: number; y: number }

export type CompositionProps = Leaf | Node

export type Rect = Composition | Picture

export type NonEmptyArray<T> = [T, ...T[]]

export type Unsubscribe = Destructoruse
export type OnAction = AnyFunction

export type Config<T> = {
  subscribe: (action: T, fn: OnAction) => Unsubscribe
}

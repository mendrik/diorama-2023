import { Composition } from '../layout/composition'

type Brand<T extends string> = { __tag: T }

export type RelativeUrl = string
export type Milliseconds = number & Brand<'ms'>

export type Picture = {
  dimension: Dimension
  aspectRatio: number
  url: RelativeUrl
}

export type PositionedPicture = {
  position: Position
  dimension: Dimension
  url: RelativeUrl
}

export type Solution = {
  pictures: PositionedPicture[]
  score: number
  sizeHomogeneity: number
  dimension: Dimension
}

export type Dimension = { width: number; height: number }
export type Position = { x: number; y: number }
export type Rect = Composition | Picture

export type NonEmptyArray<T> = [T, ...T[]]

export type Config = {
  maxComputationTime: number
  randomizeThreshold: number
  preferAspectRatio: boolean
}

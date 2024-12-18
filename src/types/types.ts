import type { Composition } from '../layout/composition.ts'

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
	balance: number
}

export type Dimension = { width: number; height: number }
export type Position = { x: number; y: number }
export type Rect = Composition | Picture

export type NonEmptyArray<T> = [T, ...T[]]

export type Config = {
	maxComputationTime: number
	randomizeThreshold: number
}

export const isPicture = (rect: Rect): rect is Picture => 'url' in rect

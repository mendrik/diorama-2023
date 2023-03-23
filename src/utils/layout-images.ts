import { Leaf, Milliseconds, Dimension, PositionedPictures } from './../types.d'
import { append, cond, head, isEmpty, map, pipe, propEq, remove } from 'ramda'
import type { CompositionProps, Picture, PositionedPicture, Node } from '../types'
import { randomInt } from './random'
import { Nothing, Maybe } from 'purify-ts'
import { C } from 'vitest/dist/types-5872e574'
import { root } from 'postcss'

const isPicture = (props: CompositionProps): props is Leaf => 'picture' in props

class Composition {
  aspectRatio: number = 0
  constructor(props: CompositionProps) {
    Object.assign(this, props)
    // prettier-ignore
    this.aspectRatio = cond<[any], number>([
      [isPicture, ({ picture }) => picture.width / picture.height],
      [propEq('horizontal', true), ({ first, second }: Node) => first.aspectRatio + second.aspectRatio],
      [propEq('horizontal', false), ({ first, second }: Node) => first.aspectRatio * second.aspectRatio / (first.aspectRatio + second.aspectRatio)]
    ])(props)
  }
}

const combine = (first: Composition, second: Composition): Composition =>
  new Composition({ horizontal: Boolean(randomInt(0, 1)), first, second })

const mergeCompositions = (compositions: Composition[]): Composition => {
  if (compositions.length === 1) {
    return head(compositions)!
  }
  const index1 = randomInt(0, compositions.length - 1)
  const index2 = randomInt(0, compositions.length - 1)

  if (index1 === index2) {
    return mergeCompositions(compositions)
  }
  const merged = combine(compositions[index1], compositions[index2])

  const lessCompositions = pipe(
    remove<Composition>(index1, 1),
    remove<Composition>(index2, 1),
    append<Composition>(merged)
  )(compositions)

  return mergeCompositions(lessCompositions)
}

const layoutSolution = (
  targetDimension: Dimension,
  aspectRatio: number,
  composition: Composition
): PositionedPictures => {
  return {
    aspectRatio,
    dimensionVariation: 0,
    pictures: []
  }
}

const findBestResult = (results: PositionedPictures[]): PositionedPictures => {
  return head(results)!
}

export const layoutImages = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
): Promise<PositionedPictures> => {
  const compositions = map(picture => new Composition({ picture }), pictures)
  const start = Date.now()
  const targetAspectRatio = targetDimension.width / targetDimension.height
  return new Promise<PositionedPictures>((resolve, reject) => {
    const results: PositionedPictures[] = []
    while (Date.now() - start < maxComputationTime) {
      const rootComposition = mergeCompositions(compositions)
      const arDifference = Math.abs(targetAspectRatio - rootComposition.aspectRatio)
      const arBest = results[0]?.aspectRatio ?? Number.MAX_SAFE_INTEGER
      if (arDifference < arBest) {
        console.log(rootComposition)
        results.unshift(layoutSolution(targetDimension, arDifference, rootComposition))
      }
    }
    if (isEmpty(results)) {
      reject('no solution found')
    }
    resolve(findBestResult(results))
  })
}

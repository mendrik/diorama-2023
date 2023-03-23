import { Maybe } from 'purify-ts'
import { append, concat, head, pipe, remove } from 'ramda'
import type {
  Picture,
  Dimension,
  Milliseconds,
  PositionedPictures,
  PositionedPicture,
  Position
} from './../types.d'
import { randomInt } from './random'

const isPicture = (rect: Rect): rect is Picture => 'url' in rect

type Rect = Composition | Picture

class Composition {
  aspectRatio: number = 0
  constructor(public horizontal: boolean, public first: Rect, public second: Rect) {
    const a = first.aspectRatio + second.aspectRatio
    this.aspectRatio = horizontal ? a : (a / first.aspectRatio) * second.aspectRatio
  }
}

const combine = (first: Rect, second: Rect): Composition =>
  new Composition(Boolean(randomInt(0, 1)), first, second)

const mergeCompositions = (compositions: Array<Rect>): Composition => {
  if (compositions.length === 1) {
    return head(compositions) as Composition
  }
  const index1 = randomInt(0, compositions.length - 1)
  const index2 = randomInt(0, compositions.length - 1)

  if (index1 === index2) {
    return mergeCompositions(compositions)
  }
  const merged = combine(compositions[index1], compositions[index2])

  const lessCompositions = pipe(
    remove<Rect>(index1, 1),
    remove<Rect>(index2, 1),
    append<Rect>(merged)
  )(compositions)

  return mergeCompositions(lessCompositions)
}

const layoutRect = (position: Position, dimension: Dimension, rect: Rect): PositionedPicture[] => {
  if (isPicture(rect)) {
    return [{ dimension, position, url: rect.url }]
  }
  const length = rect.horizontal
    ? dimension.width / rect.aspectRatio
    : dimension.height * rect.aspectRatio

  const position2: Position = rect.horizontal
    ? { x: position.x + length, y: position.y }
    : { x: position.x, y: position.y + length }

  const dimension1: Dimension = rect.horizontal
    ? { width: length, height: dimension.height }
    : { width: dimension.width, height: length }

  const dimension2: Dimension = rect.horizontal
    ? { width: dimension.width - length, height: dimension.height }
    : { width: dimension.width, height: dimension.height - length }

  return concat(
    layoutRect(position, dimension1, rect.first),
    layoutRect(position2, dimension2, rect.second)
  )
}

const layoutSolution = (
  targetDimension: Dimension,
  aspectRatio: number,
  composition: Composition
): PositionedPictures => ({
  aspectRatio,
  dimensionVariation: 0,
  pictures: layoutRect({ x: 0, y: 0 }, targetDimension, composition)
})

const findBestResult = (results: PositionedPictures[]): PositionedPictures => {
  return head(results)!
}

export const layoutImages = async (
  maxComputationTime: Milliseconds,
  targetDimension: Dimension,
  pictures: Picture[]
): Promise<PositionedPictures> => {
  const start = Date.now()
  const targetAspectRatio = targetDimension.width / targetDimension.height
  return new Promise<PositionedPictures>((resolve, reject) => {
    const results: PositionedPictures[] = []
    while (Date.now() - start < maxComputationTime) {
      const rootComposition = mergeCompositions(pictures)
      const arDifference = Math.abs(targetAspectRatio - rootComposition.aspectRatio)
      const arBest = results[0]?.aspectRatio ?? Number.MAX_SAFE_INTEGER
      if (arDifference < arBest) {
        const finalLayout = layoutSolution(targetDimension, arDifference, rootComposition)
        results.unshift(finalLayout)
      }
    }
    Maybe.fromNullable(findBestResult(results))
      .map(resolve)
      .orDefaultLazy(() => reject('no solution found'))
  })
}

import { cond, has, head, isNil, map, objOf, pipe, propEq, reduce, reduced } from 'ramda'
import { Picture, PositionedPicture } from '../types'
import { randomInt } from './random'

type Leaf = {
  picture: Picture
}

type Node = {
  horizontal: boolean
  first: Composition
  second: Composition
}

type CompositionProps = Leaf | Node

const isPicture = (props: CompositionProps): props is Leaf => 'picture' in props

class Composition {
  aspectRatio: number = 0
  constructor(props: CompositionProps) {
    Object.assign(this, props)
    // prettier-ignore
    const aspectRatio = cond<[CompositionProps], number>(
      [isPicture, ({ picture }: Leaf) => picture.width / picture.height],
      [propEq('horizontal', true), ({ first, second }: Node) => first.aspectRatio + second.aspectRatio],
      [propEq('horizontal', false), ({ first, second }: Node) => first.aspectRatio * second.aspectRatio / (first.aspectRatio + second.aspectRatio)]
    )(props)
  }
}

const compose = (first: Composition, second: Composition): Composition =>
  new Composition({ horizontal: Boolean(randomInt(0, 1)), first, second })

const mergeCompositions = (
  compositions: Composition[],
  result: Composition[] = []
): Composition => {
  if (compositions.length === 0) {
    return result[0]
  }
  const index = randomInt(1, compositions.length - 1)
  const merged = compose(compositions[0], compositions[index])
  return merged
}

export const layoutImages = async (pictures: Picture[]): Promise<PositionedPicture[]> => {
  const compositions = map(picture => new Composition({ picture }), pictures)
  const finalCompositions = mergeCompositions(compositions)

  return []
}

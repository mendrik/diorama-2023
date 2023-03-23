import { Rect } from '../types'

// eslint-disable-next-line functional/no-classes
export class Composition {
  aspectRatio = 0
  // eslint-disable-next-line no-restricted-syntax
  constructor(public horizontal: boolean, public first: Rect, public second: Rect) {
    const a = first.aspectRatio + second.aspectRatio
    this.aspectRatio = horizontal ? a : (a / first.aspectRatio) * second.aspectRatio
  }
}

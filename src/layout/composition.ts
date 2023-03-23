import { Rect } from '../types'

export class Composition {
  aspectRatio: number = 0
  constructor(public horizontal: boolean, public first: Rect, public second: Rect) {
    const a = first.aspectRatio + second.aspectRatio
    this.aspectRatio = horizontal ? a : (a / first.aspectRatio) * second.aspectRatio
  }
}

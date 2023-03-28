import type { Rect } from '../types/types'

export class Composition {
  aspectRatio = 0
  constructor(public horizontal: boolean, public first: Rect, public second: Rect) {
    const a = first.aspectRatio + second.aspectRatio
    this.aspectRatio = horizontal ? a : (first.aspectRatio * second.aspectRatio) / a
  }
}

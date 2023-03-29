import { resizeDimension } from './resize-dimension'

describe('resize dimensions', () => {
  it('wide rect', () => {
    const dim = resizeDimension({ width: 100, height: 100 }, 16 / 9)
    expect(dim).toEqual({ width: 100, height: 56.25 })
  })
  it('tall rect', () => {
    const dim = resizeDimension({ width: 100, height: 100 }, 1 / 2)
    expect(dim).toEqual({ width: 50, height: 100 })
  })
})

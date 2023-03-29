import { isNotEmpty } from './isNotEmpty'

describe('isNotEmpty', () => {
  it('works with filled array', () => {
    const arr = [2, 4, 6]
    expect(isNotEmpty(arr)).toEqual(true)
  })
  it('works with empty array', () => {
    const arr: number[] = []
    expect(isNotEmpty(arr)).toEqual(false)
  })
})

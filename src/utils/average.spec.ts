import { average } from './average'

describe('average', () => {
  it('computes an average value', () => {
    const arr = [2, 4, 6]
    expect(average(arr)).toEqual(4)
  })
})

import { normalize } from './normalize'

describe('normalize', () => {
  it('can normalize values between 0 and 1', () => {
    const arr = [0, 3, 6]
    expect(normalize(arr)).toEqual([0, 0.5, 1])
  })
})

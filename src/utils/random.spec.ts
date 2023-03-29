import { randomInt } from './random'

describe('randomInt', () => {
  it('respects boundaries', () => {
    const rnd = (): number => randomInt(2, 5)
    vi.spyOn(Math, 'random').mockReturnValueOnce(0)
    expect(rnd()).toEqual(2)
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.99999)
    expect(rnd()).toEqual(5)
  })

  it('respects boundaries with min 0', () => {
    const rnd = (): number => randomInt(0, 5)
    vi.spyOn(Math, 'random').mockReturnValueOnce(0)
    expect(rnd()).toEqual(0)
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.99999)
    expect(rnd()).toEqual(5)
  })
})

import { sizeVariation } from './size-variation.js'

describe('size variation', () => {
	it('equal rects have max score', () => {
		const dim1 = { width: 100, height: 100 }
		const dim2 = { width: 100, height: 100 }
		expect(sizeVariation([dim1, dim2])).toEqual(1)
	})
	it('half rect has .25', () => {
		const dim1 = { width: 100, height: 100 }
		const dim2 = { width: 50, height: 50 }
		expect(sizeVariation([dim1, dim2])).toEqual(0.25)
	})
	it('total size diff has 0', () => {
		const dim1 = { width: 100, height: 100 }
		const dim2 = { width: 0, height: 0 }
		expect(sizeVariation([dim1, dim2])).toEqual(0)
	})
})

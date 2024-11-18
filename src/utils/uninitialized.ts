import { throwError } from './throw-error.js'

export const uninitialized = <T extends object>(): T =>
	new Proxy<T>({} as T, {
		get(target, property): never {
			return throwError(
				`Object was not yet initialized [tried to access: ${String(property)}]`
			)
		}
	})

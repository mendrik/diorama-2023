import type { SyntheticEvent } from 'react'

export const eventValue = <T extends Element>(ev: SyntheticEvent<T>): string =>
  (ev.target as HTMLInputElement).value


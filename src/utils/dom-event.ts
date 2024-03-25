import { path } from 'ramda'
import { SyntheticEvent } from 'react'

export const eventValue: <T extends Element>(ev: SyntheticEvent<T>) => any = path([
  'target',
  'value'
])

import { useCalculate } from './hooks/use-calculate'
import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (import.meta.env.DEV) {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[useCalculate, 'useCalculate']]
  })
}

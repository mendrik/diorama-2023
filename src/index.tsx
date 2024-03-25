import { createRoot } from 'react-dom/client'
import { Maybe } from 'purify-ts'
import { throwError } from './utils/throw-error'
import React, { StrictMode } from 'react'
import { Controls } from './ui/controls'
import { Diorama } from './ui/diorama'

Maybe.fromNullable(document.getElementById('root'))
  .ifNothing(() => throwError('#root element not found'))
  .map(createRoot)
  .map(root => {
    root.render(
      <StrictMode>
        <Controls />
        <Diorama />
      </StrictMode>
    )
  })

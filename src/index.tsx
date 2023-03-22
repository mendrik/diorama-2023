import { App } from './ui/app'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Maybe } from 'purify-ts'
import { throwError } from './utils/throw-error'

Maybe.fromNullable(document.getElementById('root'))
  .ifNothing(() => throwError('#root element not found'))
  .map(createRoot)
  .map(root =>
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  )

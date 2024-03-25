import { createRoot } from 'react-dom/client'
import { Maybe } from 'purify-ts'
import { throwError } from './utils/throw-error'
import { MainPage } from './ui/main-page'
import React, { StrictMode } from 'react'
import { Controls } from './ui/controls'
import styled from 'styled-components'

const FullSize = styled.div`
  width: 100%;
  height: 100%;
`
Maybe.fromNullable(document.getElementById('root'))
  .ifNothing(() => throwError('#root element not found'))
  .map(createRoot)
  .map(root =>
    root.render(
      <StrictMode>
        <Controls>
          <FullSize>
            <MainPage />
          </FullSize>
        </Controls>
      </StrictMode>
    )
  )

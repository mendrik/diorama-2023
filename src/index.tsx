// import './wdyr'

import { createRoot } from 'react-dom/client'
import { Maybe } from 'purify-ts'
import { throwError } from './utils/throw-error'
import { loadImages } from './utils/load-images'
import { images } from './constants'
import { MainPage } from './ui/main-page'
import React, { StrictMode } from 'react'

Maybe.fromNullable(document.getElementById('root'))
  .ifNothing(() => throwError('#root element not found'))
  .map(createRoot)
  .map(root =>
    loadImages(images)
      .then(images => {
        root.render(
          <StrictMode>
            <MainPage images={images} />
          </StrictMode>
        )
      })
      .catch(() => alert('Failed to load imagges'))
  )

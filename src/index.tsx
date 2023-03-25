import { createRoot } from 'react-dom/client'
import { Maybe } from 'purify-ts'
import { throwError } from './utils/throw-error'
import { loadImages } from './utils/load-images'
import { images } from './constants'
import { MainPage } from './ui/main-page'

Maybe.fromNullable(document.getElementById('root'))
  .ifNothing(() => throwError('#root element not found'))
  .map(createRoot)
  .map(root =>
    loadImages(images)
      .then(images => {
        root.render(<MainPage images={images} />)
      })
      .catch(() => alert('Failed to load imagges'))
  )
